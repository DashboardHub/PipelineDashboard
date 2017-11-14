'use strict';

const environment = require('./../models/environment');

module.exports.get = (event, context, callback) => {
    const id = event.path.id;

    environment.model.get({ id }, function(err, result) {
        if(err) { return console.log(err); }
        if (result.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, result);
    });
};
