'use strict';

const environment = require('./../models/environment');

module.exports.public = (event, context, callback) => {

    environment.model.scan('isPrivate').eq(false).exec(function (err, results) {
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
                list: results
            })
        });

    });

};

module.exports.private = (event, context, callback) => {

    environment.model.scan('owner').eq(event.principalId).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            total: results.length,
            list: results
        });
    });

};
