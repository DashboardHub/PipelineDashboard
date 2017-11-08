'use strict';

const uuidv1 = require('uuid/v1');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');

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

        const params = {
            TableName: config.dynamodb.deployed.table,
            Item: {
                id: uuidv1(),
                environmentId: environment.id,
                token: token[0],
                release: data.release,
                createdAt: now
            },
        };

        dynamodb.put(params, (error) => {
            if (error) {
                console.error(error);
                return callback(new Error('Couldn\'t create the environment item.'));
            }

            callback(null, JSON.stringify(params.Item));
        });
    });
};
