'use strict';

const uuid = require('uuid');
const dynamodb = require('../dynamodb');
const config = require('../config');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.name !== 'string') {
        console.error('Validation Failed');
        callback(new Error('Couldn\'t create the environment item.'));
        return;
    }

    const params = {
        TableName: config.dynamodb.environments.table,
        Item: {
            id: uuid.v1(),
            name: data.name,
            isPrivate: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    // write the environment to the database
    dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t create the environment item.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};
