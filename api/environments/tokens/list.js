'use strict';

const environment = require('./../../models/environment');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    environment.model.get({ id }, function(err, result) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (result.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, {
            total: result.tokens.length,
            list: result.tokens
        });
    });

};
