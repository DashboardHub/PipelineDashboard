'use strict';

const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.get = (event, context, callback) => {
    const id = event.path.id;

    const params = {
        TableName: config.dynamodb.environments.table,
        Key: {
            id: id
        }
    };

    dynamodb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!result.Item) {
            return callback(new Error('[404] Not found'));
        }

        callback(null, result.Item);
    });
};
