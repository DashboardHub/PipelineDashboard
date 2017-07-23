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
            return callback(new Error('Couldn\'t fetch the environments.'));
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                total: result.Items.length,
                list: result.Items
            })
        });
    });
};
