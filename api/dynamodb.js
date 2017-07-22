'use strict';

const AWS = require('aws-sdk');
const config = require('./config');

const client = new AWS.DynamoDB.DocumentClient(process.env.IS_OFFLINE ? config.offline : {});

module.exports = client;
