'use strict';

const environmentModel = require('./../models/environment');
const deployedModel = require('./../models/deployed');
const pingedModel = require('./../models/pinged');

module.exports.public = (event, context, callback) => {

    environmentModel.model.scan().counts().exec(function (err, environments) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the environments.'));
        }

        deployedModel.model.scan().counts().exec(function (err, deploys) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the deploys.'));
            }

            pingedModel.model.scan().counts().exec(function (err, pings) {
                if (err) {
                    console.log(err);
                    return callback(new Error('Couldn\'t fetch the pings.'));
                }

                return callback(null, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    statusCode: 200,
                    body: JSON.stringify({
                        environments: environments.count || 0,
                        deploys: deploys.count || 0,
                        pings: pings.count || 0
                    })
                });

            });
        });

    });

};

module.exports.private = (event, context, callback) => {

    environmentModel.model.scan('owner').eq(event.principalId).exec(function (err, environments) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the environments.'));
        }

        if (environments.length === 0) {
            return callback(null, {
                environments: 0,
                deploys: 0
            });
        }

        deployedModel.model.scan('environmentId')
            .in(environments
                .map((environment) => environment.id))
            .counts().exec(function (err, deploys) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the deploys.'));
            }

            pingedModel.model.scan('environmentId')
                .in(environments
                    .map((environment) => environment.id))
                .counts().exec(function (err, pings) {
                if (err) {
                    console.log(err);
                    return callback(new Error('Couldn\'t fetch the pings.'));
                }

                return callback(null, {
                    environments: environments.length,
                    deploys: deploys.count || 0,
                    pings: pings.count || 0
                });
            });
        });

    });

};
