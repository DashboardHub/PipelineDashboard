'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.update = (event, context, callback) => {
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

    dynamodb.scan(getParams, (error, result) => {
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
                ':updatedAt': new Date().toISOString()
            },
            UpdateExpression: '',
            ReturnValues: 'ALL_NEW',
        };

        if (data) {
            if (!Array.isArray(data)) {
                return callback(new Error('[400] Validation Error: "patch" must be an "array" of operations'));
            }
        }

        let updateExpression = [];
        data.map((item) => {
            if (item.op === undefined || item.path === undefined || item.value === undefined) {
                return callback(new Error('[400] Validation Error: each "patch" item must be have a "op", "path", "value"'));
            }

            switch (item.path) {
                case '/title':
                    updateParams.ExpressionAttributeValues[':title'] = item.value;
                    updateExpression.push('title = :title');
                    break;
                case '/description':
                    updateParams.ExpressionAttributeValues[':description'] = item.value.length === 0 ? null : item.value;
                    updateExpression.push('description = :description');
                    break;
                case '/link':
                    updateParams.ExpressionAttributeValues[':link'] = item.value.length === 0 ? null : item.value;
                    updateExpression.push('link = :link');
                    break;
            }
        });

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
