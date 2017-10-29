'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.public = (event, context, callback) => {
    const params = {
        TableName: config.dynamodb.environments.table,
    };

    dynamodb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the environments.'));
        }

        callback(null, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                total: result.Items.length,
                list: result.Items
            })
        });
    });
};

module.exports.private = (event, context, callback) => {
    const params = {
        TableName: config.dynamodb.environments.table,
        FilterExpression: '#owner = :owner',
        ExpressionAttributeNames: {
            '#owner': 'owner'
        },
        ExpressionAttributeValues: {
            ':owner': event.principalId
        }
    };

    dynamodb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the environments.'));
        }

        callback(null, {
            total: result.Items.length,
            list: result.Items
        });
    });
};
