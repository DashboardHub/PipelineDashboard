'use strict';

const uuidv1 = require('uuid/v1');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');

module.exports.create = (event, context, callback) => {
    const id = event.path.id;
    const data = event.body;

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

    const now = new Date().toISOString();
    dynamodb.scan(getParams, (error, result) => {
        let environment = result.Items[0];

        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (result.Items.length !== 1) {
            return callback(new Error('[404] Not found'));
        }

        let updateParams = {
            TableName: config.dynamodb.environments.table,
            Key: { id },
            ExpressionAttributeValues: {
                ':updatedAt': now
            },
            UpdateExpression: '',
            ReturnValues: 'ALL_NEW',
        };

        if (typeof data.name !== 'string' || !validator.isLength(data.name, {min: 3, max: 32})) {
            return callback(new Error('[400] Validation Error: "title" is required and must be a "string" between 3 and 32'));
        }

        let updateExpression = [];

        environment.tokens.push({
            id: uuidv1(),
            environmentId: id,
            name: data.name,
            token: uuidv1(),
            createdAt: now
        });

        updateParams.ExpressionAttributeValues[':tokens'] = environment.tokens;
        updateExpression.push('tokens = :tokens');

        if (updateExpression.length === 0) {
            return callback(new Error('[400] Validation Error: no update to perform "path"  must be one of "title", "description", "link"'));
        }

        updateParams.UpdateExpression = 'SET ' + updateExpression.join(',') + ', updatedAt = :updatedAt';

        dynamodb.update(updateParams, (error, result) => {
            if (error) {
                console.error(error);
                return callback(new Error('Couldn\'t fetch the item.'));
            }

            callback(null, result.Attributes);
        });
    });
};
