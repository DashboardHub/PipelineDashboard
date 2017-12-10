'use strict';

const deployedModel = require('../../models/deployed');
const environmentModel = require('../../models/environment');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function(err, environment) {
        if(err) { return console.log(err); }
        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        deployedModel.model.scan('environmentId').contains(id).exec(function (err, deploys) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            callback(null, {
                total: deploys.length,
                list: deploys
            });
        });
    });

};
