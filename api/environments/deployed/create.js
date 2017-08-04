'use strict';

const uuid = require('uuid');
const dynamodb = require('../../dynamodb');
const config = require('../../config');
const validator = require('validator');

module.exports.create = (event, context, callback) => {
    const environment = event.pathParameters.id;
    const timestamp = new Date().toISOString();
    const data = JSON.parse(event.body);

    if (typeof environment !== 'string') {
        return callback(null, {
            statusCode: 400,
            body: JSON.stringify({message: 'Validation Error: "environment id" is required'}),
        });
    }

    const environmentParams = {
        TableName: config.dynamodb.environments.table,
        Key: {
            id: environment
        }
    };

    dynamodb.get(environmentParams, (error, result) => {
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

        if (typeof data.release !== 'string' || !validator.isLength(data.release, {min: 3, max: 32})) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({message: 'Validation Error: "release" is required and must be a "string" between 3 and 32'}),
            });
        }

        const deployedParams = {
            TableName: config.dynamodb.deployed.table,
            Item: {
                id: uuid.v1(),
                environmentId: environment,
                release: data.release,
                createdAt: timestamp,
            },
        };

        // write the environment to the database
        dynamodb.put(deployedParams, (error) => {
            // handle potential errors
            if (error) {
                console.error(error);
                return callback(new Error('Couldn\'t create the deployed item.'));
            }

            let updateParams = {
                TableName: config.dynamodb.environments.table,
                Key: { id: environment },
                ExpressionAttributeValues: {
                    ':latestRelease': data.release,
                    ':releases': ++result.Item.releases,
                    ':updatedAt': new Date().toISOString()
                },
                UpdateExpression: 'SET latestRelease = :latestRelease, releases = :releases, updatedAt = :updatedAt',
                ReturnValues: 'ALL_NEW',
            };

            dynamodb.update(updateParams, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error);
                    return callback(new Error('Couldn\'t fetch the item.'));
                }

                callback(null, {
                    headers: {
                        "Access-Control-Allow-Origin" : "*"
                    },
                    statusCode: 201,
                    body: JSON.stringify(result.Attributes),
                });
            });
        });
    });
};
