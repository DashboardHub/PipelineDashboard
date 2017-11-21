'use strict';

const client = require('./../dynamoose');
const validator = require('validator');

const config = require('../config');

const Schema = client.dynamoose.Schema;

const schema = new Schema({
        id: {
            type: String,
            hashKey: true,
            required: true
        },
        environmentId: {
            type: String,
            required: true
        },
        release: {
            type: String,
            required: true,
            trim: true,
            validate: ((value) => typeof value === 'string' && validator.isLength(value, {min: 1, max: 32}))
        },
        state: {
            type: String,
            required: true,
            trim: true,
            validate: ((value) => typeof value === 'string' && validator.isIn(value, [ 'startBuild', 'finishBuild', 'startDeploy', 'finishDeploy' ]))
        },
        token: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true,
        useDocumentTypes: true,
        useNativeBooleans: true,
        throughput: { read: 1, write: 1 }
    });

let model = client.dynamoose.model(config.dynamodb.deployed.table, schema, {
    create: true, // Create table in DB, if it does not exist,
    update: true, // Update remote indexes if they do not match local index structure
    waitForActive: false, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports = { model };
