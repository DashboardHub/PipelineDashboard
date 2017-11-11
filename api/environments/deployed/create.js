'use strict';

const uuidv1 = require('uuid/v1');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');
const deployed = require('../../models/deployed');
const dynamoose = require('dynamoose');

// dynamoose.local();
dynamoose.AWS.config.update({
    region: 'eu-west-2'
});
const Deployed = dynamoose.model(config.dynamodb.deployed.table, deployed.schema, {
    create: true, // Create table in DB, if it does not exist,
    update: false, // Update remote indexes if they do not match local index structure
    waitForActive: false, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports.create = (event, context, callback) => {
    const id = event.path.id;
    const tokenId = event.path.tokenId;
    const data = event.body;

    const getParams = {
        TableName: config.dynamodb.environments.table,
        FilterExpression:'#id = :id',
        ExpressionAttributeNames: {
            '#id':'id'
        },
        ExpressionAttributeValues: {
            ':id': id
        }
    };

    const now = new Date().toISOString();
    dynamodb.scan(getParams, (error, result) => {
        let environment = result.Items[0];
        let token = environment.tokens.filter((token) => token.id === tokenId);

        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (result.Items.length !== 1 || token.length === 0) {
            return callback(new Error('[404] Not found'));
        }

        if (typeof data.release !== 'string' || !validator.isLength(data.release, {min: 3, max: 32})) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({message: 'Validation Error: "release" is required and must be a "string" between 3 and 32'}),
            });
        }

        let item = {
            id: uuidv1(),
            environmentId: environment.id,
            token: token[0],
            release: data.release
        };
        let deploy = new Deployed(item);
        deploy.save(function (err) {
            if(err) { return console.log(err); }
            console.log('Ta-da!');
            callback(null, JSON.stringify(item));
        });
    });
};
