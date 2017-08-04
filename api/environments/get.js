'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.get = (event, context, callback) => {
    const params = {
        TableName: config.dynamodb.environments.table,
        Key: {
            id: event.pathParameters.id,
        }
    };

    // fetch all environments from the database
    dynamodb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!result.Item) {
            return callback(null, {
                statusCode: 404,
                body: JSON.stringify({message: 'Not found'}),
            });
        }

        callback(null, {
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            statusCode: 200,
            body: JSON.stringify(result.Item)
        });
    });
};
