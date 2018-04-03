'use strict';

const deployedModel = require('../models/deployed');
const environmentModel = require('../models/environment');
const pingedModel = require('../models/pinged');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        deployedModel.model.scan('environmentId').contains(id).exec(function (err, results) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            let deployedDeletes = results.map((item) => ({ id: item.id }));

            deployedModel.model.batchDelete(deployedDeletes, function (err) {
                if (err) {
                    console.log(err);
                    return callback(new Error('Couldn\'t delete the items.'));
                }

                pingedModel.model.scan('environmentId').contains(id).exec(function (err, results) {
                    if (err) {
                        console.log(err);
                        return callback(new Error('Couldn\'t fetch the items.'));
                    }

                    let pingedDeletes = results.map((item) => ({ id: item.id }));

                    pingedModel.model.batchDelete(pingedDeletes, function (err) {
                        if (err) {
                            console.log(err);
                            return callback(new Error('Couldn\'t delete the items.'));
                        }

                        environment.delete(function (err) {
                            if (err) {
                                console.log(err);
                                return callback(new Error('Couldn\'t delete the item.'));
                            }
                            callback(null, {});
                        });
                    });

                });
            });

        });
    });
};
