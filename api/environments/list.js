'use strict';

const environment = require('./../models/environment');

module.exports.public = (event, context, callback) => {

    let attributes = ['id', 'owner', 'title', 'releases', 'latestRelease', 'progress', 'type', 'description', 'link', 'updatedAt'];
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
                list: calculateProgress(results)
            })
        });

    });

};

module.exports.private = (event, context, callback) => {

    let attributes = ['id', 'isPrivate', 'owner', 'title', 'releases', 'latestRelease', 'progress', 'type', 'description', 'link', 'updatedAt'];
    environment.model.scan('owner').eq(event.principalId).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        return callback(null, {
            total: results.length,
            list: calculateProgress(results)
        });
    });

};

let calculateProgress = (environments) => {
    return environments.map((environment) => {
            if (environment.latestRelease) {
                switch (environment.type) {
                    case 'build':
                        switch (environment.latestRelease.state) {
                            case 'startBuild':
                                environment.progress = 50;
                                break;
                            case 'finishBuild':
                                environment.progress = 100;
                                break;
                            default:
                                environment.progress = 0;
                        }
                        break;
                    case 'deploy':
                        switch (environment.latestRelease.state) {
                            case 'startDeploy':
                                environment.progress = 50;
                                break;
                            case 'finishDeploy':
                                environment.progress = 100;
                                break;
                            default:
                                environment.progress = 0;
                        }
                        break;
                    case 'build-deploy':
                    default:
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
                        break;
                }
            }

            return environment;
        }
    );
};
