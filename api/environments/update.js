'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.update = (event, context, callback) => {
    const data = JSON.parse(event.body);

    let params = {
        TableName: config.dynamodb.environments.table,
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeValues: {
            ':updatedAt': new Date().toISOString()
        },
        UpdateExpression: '',
        ReturnValues: 'ALL_NEW',
    };

    if (data) {
        if (!Array.isArray(data)) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({message: 'Validation Error: "patch" must be an "array" of operations'}),
            });
        }
    }

    let updateExpression = [];
    data.map((item) => {
        if (item.op === undefined || item.path === undefined || item.value === undefined) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({message: 'Validation Error: each "patch" item must be have a "op", "path", "value"'}),
            });
        }

        switch(item.path) {
            case '/title':
                params.ExpressionAttributeValues[':title'] = item.value;
                updateExpression.push('title = :title');
            break;
            case '/description':
                params.ExpressionAttributeValues[':description'] = item.value.length === 0 ? null : item.value;
                updateExpression.push('description = :description');
            break;
        }
    });

    if (updateExpression.length === 0) {
        return callback(null, {
            statusCode: 400,
            body: JSON.stringify({message: 'Validation Error: no update to perform "path"  must be one of "title", "description"'}),
        });
    }

    params.UpdateExpression = 'SET ' + updateExpression.join(',') + ', updatedAt = :updatedAt';

    // fetch all environments from the database
    dynamodb.update(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        callback(null, {
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            statusCode: 200,
            body: JSON.stringify(result.Attributes)
        });
    });
};
