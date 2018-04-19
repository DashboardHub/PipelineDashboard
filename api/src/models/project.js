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
            owner: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isLength(v, { min: 3, max: 32 })),
            },
            description: {
                type: String,
                default: '',
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isLength(v, { min: 3, max: 1024 })),
            },
            environments: {
                type: Array,
                default: []
            },
            isPrivate: {
                type: Boolean,
                required: true,
                default: false,
            }
        },
        {
            timestamps: true,
            useDocumentTypes: true,
            useNativeBooleans: true,
            throughput: { read: 5, write: 5 },
        });

let model = client.dynamoose.model(config.dynamodb.projects.table, schema, {
    create: true, // Create table in DB, if it does not exist,
    update: true, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports = { model };
