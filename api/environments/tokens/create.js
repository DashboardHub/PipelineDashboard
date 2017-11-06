'use strict';

const uuidv1 = require('uuid/v1');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');

module.exports.create = (event, context, callback) => {
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

        const timestamp = new Date().toISOString();
        const data = event.body;

        if (typeof data.name !== 'string' || !validator.isLength(data.name, {min: 3, max: 32})) {
            return callback(new Error('[400] Validation Error: "title" is required and must be a "string" between 3 and 32'));
        }

        const params = {
            TableName: config.dynamodb.tokens.table,
            Item: {
                id: uuidv1(),
                environmentId: id,
                name: data.name,
                token: uuidv1(),
                createdAt: timestamp
            }
        };

        dynamodb.put(params, (error) => {
            if (error) {
                console.error(error);
                return callback(new Error('Couldn\'t create the environment item.'));
            }

            callback(null, params.Item);
        });
    });
};
