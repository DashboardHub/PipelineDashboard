'use strict';

const uuid = require('uuid');
const dynamodb = require('../dynamodb');
const config = require('../config');
const validator = require('validator');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.name !== 'string' || !validator.isLength(data.name, {min: 3, max: 32})) {
        return callback(new Error('[400] Validation Error: "name" is required and must be a "string" between 3 and 32'));
    }

    if (data.description) {
        if (typeof data.description !== 'string' || !validator.isLength(data.description, {min: 3, max: 1024})) {
            return callback(new Error('[400] Validation Error: "description" is optional but a "string" must be between 3 and 1024'));
        }
    }

    if (data.tags) {
        if (!Array.isArray(data.tags)) {
            return callback(new Error('[400] Validation Error: "tags" is optional but must be an "array"'));
        }
    }

    if (data.isPrivate) {
        if (typeof data.isPrivate !== 'boolean') {
            return callback(new Error('[400] Validation Error: "isPrivate" is optional but must be a "boolean"'));
        }
    }

    const params = {
        TableName: config.dynamodb.environments.table,
        Item: {
            id: uuid.v1(),
            name: data.name,
            description: data.description,
            tags: data.tags || [],
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
            return callback(new Error('Couldn\'t create the environment item.'));
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        });
    });
};
