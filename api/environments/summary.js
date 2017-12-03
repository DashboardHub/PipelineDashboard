'use strict';

const deployedModel = require('./../models/deployed');
const environmentModel = require('./../models/environment');

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

            return callback(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 200,
                body: JSON.stringify({
                    environments: environments.count || 0,
                    deploys: deploys.count || 0
                })
            });

        });

    });

};

module.exports.private = (event, context, callback) => {

    environmentModel.model.scan('owner').eq(event.principalId).exec(function (err, environments) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        deployedModel.model.scan('environmentId')
            .in(environments
                .map((environment) => environment.id))
            .counts().exec(function (err, deploys) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            return callback(null, {
                environments: environments.length,
                deploys: deploys.count || 0
            });
        });
    });

};
