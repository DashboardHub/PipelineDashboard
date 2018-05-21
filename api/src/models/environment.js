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
            link: {
                type: String,
                default: '',
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isLength(v, { min: 3, max: 1024 })),
            },
            releases: {
                type: Number,
                default: 0,
                trim: true,
            },
            latestRelease: {
                type: Object,
                default: {},
            },
            pings: {
                type: Object,
                default: { valid: 0, invalid: 0 },
            },
            latestPing: {
                type: Object,
                default: {},
            },
            isPrivate: {
                type: Boolean,
                required: true,
                default: false,
            },
            tokens: {
                type: Array,
                default: [],
                validate: ((v) => v.map((item) => (typeof item.name === 'string' && validator.isLength(item.name, { min: 3, max: 32 })))),
            },
            tags: {
                type: Array,
                default: [],
                validate: ((v) => v.map((item) => (typeof item.name === 'string' && validator.isLength(item.name, { min: 3, max: 32 })))),
            },
            monitors: {
                type: Array,
                default: [],
                validate: ((v) => v.map((item) => (typeof item.uri === 'string' && validator.isLength(item.uri, { min: 0, max: 64 })))),
            },
            type: {
                type: String,
                required: true,
                trim: true,
                validate: ((v) => typeof v === 'string' && validator.isIn(v, ['build', 'deploy', 'build-deploy'])),
            },
            logo: {
                type: String,
                default: '',
                trim: true,
                validate: ((v) =>
                                typeof v === 'string' &&
                                validator.isLength(v, { min: 5, max: 1024 }) &&
                                validator.isURL(v, { protocols: ['https'], require_protocol: true })
                ),
            },
            views: {
                type: Number,
                default: 0,
                trim: true,
            },
        },
        {
            timestamps: true,
            useDocumentTypes: true,
            useNativeBooleans: true,
            throughput: { read: 5, write: 5 },
        });

schema.methods.setLink = function(link) {
  if (link && link.endsWith('/')) {
    link = link.slice(0, -1);
  }

  this.link = link;
};

let model = client.dynamoose.model(config.dynamodb.environments.table, schema, {
    create: true, // Create table in DB, if it does not exist,
    update: true, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
    waitForActiveTimeout: 180000 // wait 3 minutes for table to activate
});

module.exports = { model };
