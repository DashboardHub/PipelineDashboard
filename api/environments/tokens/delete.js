'use strict';

const uuidv1 = require('uuid/v1');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;
    const tokenId = event.path.tokenId;

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

        let updateExpression = [];

        environment.tokens = environment.tokens.filter((token) => token.id !== tokenId);

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

            callback();
        });
    });
};
