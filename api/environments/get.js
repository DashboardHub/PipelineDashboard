'use strict';

const environmentModel = require('./../models/environment');

module.exports.get = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function(err, environment) {
        if(err) { return console.log(err); }
        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, environment);
    });
};
