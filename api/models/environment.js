'use strict';

const client = require('./../dynamoose');

const config = require('../config');

const Schema = client.dynamoose.Schema;

const schema = new Schema({
        id: {
            type: String,
            hashKey: true,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: '',
            trim: true
        },
        link: {
            type: String,
            default: '',
            trim: true
        },
        releases: {
            type: Number,
            default: 0,
            trim: true
        },
        isPrivate: {
            type: Boolean,
            required: true,
            default: false
        },
        tokens: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        useDocumentTypes: true,
        useNativeBooleans: true,
        throughput: { read: 1, write: 1 }
    });

let model = client.dynamoose.model(config.dynamodb.environments.table, schema, {
    create: true, // Create table in DB, if it does not exist,
    update: true, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports = { model };
