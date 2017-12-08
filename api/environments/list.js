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
                list: results.map((environment) => {
                    if (environment.latestRelease) {
                        switch (environment.latestRelease.state) {
                            case 'startBuild':
                                environment.progress = 25;
                                break;
                            case 'finishBuild':
                                environment.progress = 50;
                                break;
                            case 'startDeploy':
                                environment.progress = 75;
                                break;
                            case 'finishDeploy':
                                environment.progress = 100;
                                break;
                            default:
                                environment.progress = 0;
                        }
                    }

                    return environment;
                })
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
