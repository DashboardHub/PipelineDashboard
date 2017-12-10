'use strict';

const environmentModel = require('./../../models/environment');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function(err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, {
            total: environment.tokens.length,
            list: environment.tokens
        });
    });

};
