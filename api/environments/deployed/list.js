'use strict';

const config = require('../../config');
const deployed = require('../../models/deployed');
const dynamoose = require('dynamoose');

dynamoose.local();
dynamoose.AWS.config.update({
    region: 'eu-west-2'
});
const Deployed = dynamoose.model(config.dynamodb.deployed.table, deployed.schema, {
    create: true, // Create table in DB, if it does not exist,
    update: false, // Update remote indexes if they do not match local index structure
    waitForActive: false, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    // @TODO: check owner

    Deployed.scan().exec(function (err, deploys) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        console.log(deploys);

        callback(null, JSON.stringify({
            total: deploys.length | 0,
            list: deploys.map((deploy) => deploy)
        }));
    });
};
