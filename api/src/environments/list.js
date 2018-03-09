'use strict';

const environment = require('./../models/environment');
const progress = require('./../environments/_helpers/progress');

module.exports.public = (event, context, callback) => {

    let attributes = ['id', 'owner', 'title', 'releases', 'latestRelease', 'pings', 'latestPing', 'progress', 'type', 'description', 'link', 'logo', 'createdAt', 'updatedAt'];
    environment.model.scan('isPrivate').eq(false).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                total: results.length,
                list: progress.calculateAll(results)
            })
        });

    });

};

module.exports.private = (event, context, callback) => {

    let attributes = ['id', 'isPrivate', 'owner', 'title', 'releases', 'latestRelease', 'pings', 'latestPing', 'progress', 'type', 'description', 'link', 'tokens', 'monitors', 'logo', 'views', 'createdAt', 'updatedAt'];
    environment.model.scan('owner').eq(event.principalId).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            total: results.length,
            list: progress.calculateAll(results)
        });
    });

};
