'use strict';

const deployed = require('../../models/deployed');
const environment = require('../../models/environment');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    environment.model.get({ id }, function(err, environment) {
        if(err) { return console.log(err); }
        if (environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        deployed.model.scan().exec(function (err, results) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            callback(null, {
                total: results.length,
                list: results
            });
        });
    });

};
