'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: config.dynamodb.environments.table,
    };

    // fetch all environments from the database
    dynamodb.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the environments.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};
