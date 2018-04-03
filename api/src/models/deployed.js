'use strict';

const client = require('../dynamoose');
const validator = require('validator');

const config = require('../../config');

const Schema = client.dynamoose.Schema;

const schema = new Schema({
            id: {
                type: String,
                hashKey: true,
                required: true,
            },
            environmentId: {
                type: String,
                required: true,
            },
            release: {
                type: String,
                required: true,
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isLength(v, { min: 1, max: 64 })),
            },
            state: {
                type: String,
                required: true,
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isIn(v, ['startBuild', 'finishBuild', 'startDeploy', 'finishDeploy', 'failBuild', 'failDeploy'])),
            },
            token: {
                type: Object,
                required: true,
            },
        },
        {
            expires: config.dynamodb.deployed.ttl,
            timestamps: true,
            useDocumentTypes: true,
            useNativeBooleans: true,
            throughput: { read: 5, write: 5 },
        });

let model = client.dynamoose.model(config.dynamodb.deployed.table, schema, {
    create: true, // Create table in DB, if it does not exist,
    update: true, // Update remote indexes if they do not match local index structure
    waitForActive: false, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports = { model };
