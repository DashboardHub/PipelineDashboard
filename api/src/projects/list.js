'use strict';

const _ = require('lodash');

const project = require('./../models/project');

module.exports.public = (event, context, callback) => {

    let attributes = ['id', 'owner', 'title', 'description', 'environments', 'createdAt', 'updatedAt'];

    project.model.scan('isPrivate').eq(false).attributes(attributes).exec(function(err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify({
                total: results.length,
                list: _.orderBy(results, ['updatedAt'], ['desc']),
            }),
        });

    });

};

module.exports.private = (event, context, callback) => {

    let attributes = ['id', 'owner', 'title', 'description', 'environments', 'isPrivate', 'createdAt', 'updatedAt'];

    project.model.scan('owner').eq(event.principalId).attributes(attributes).exec(function(err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            total: results.length,
            list: _.orderBy(results, ['updatedAt'], ['desc']),
        });
    });

};
