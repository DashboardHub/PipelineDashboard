'use strict';

const dynamodb = require('../../dynamodb');
const config = require('../../config');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    const getParams = {
        TableName: config.dynamodb.environments.table,
        FilterExpression:'#id = :id and #owner = :owner',
        ExpressionAttributeNames: {
            '#id':'id',
            '#owner':'owner'
        },
        ExpressionAttributeValues: {
            ':id': id,
            ':owner': event.principalId
        }
    };

    dynamodb.scan(getParams, (error, result) => {
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (result.Items.length !== 1) {
            return callback(new Error('[404] Not found'));
        }

        const params = {
            TableName: config.dynamodb.tokens.table,
            FilterExpression: '#environmentId = :environmentId',
            ExpressionAttributeNames: {
                '#environmentId': 'environmentId'
            },
            ExpressionAttributeValues: {
                ':environmentId': id
            }
        };

        dynamodb.scan(params, (error, result) => {
            if (error) {
                console.error(error);
                return callback(new Error('Couldn\'t fetch the tokens.'));
            }

            callback(null, {
                total: result.Items.length,
                list: result.Items
            });
        });

    });
};
