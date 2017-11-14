'use strict';

const environmentModel = require('../../models/environment');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;
    const tokenId = event.path.tokenId;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        let tokens = environment.tokens.filter((token) => token.id !== tokenId);
        environmentModel.model.update({ id }, { tokens }, function (err) {
            if(err) { return console.log(err); }
            callback(null, environment.tokens);
        });
    });

};
