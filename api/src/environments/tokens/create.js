'use strict';

const uuidv1 = require('uuid/v1');
const environmentModel = require('../../models/environment');

module.exports.create = (event, context, callback) => {
    const id = event.path.id;
    const data = event.body;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        let token = {
            id: uuidv1(),
            name: data.name
        };

        environment.tokens.push(token);
        environmentModel.model.update({ id }, { tokens: environment.tokens }, function (err) {
            if (err) {
                console.log(err);
                switch (err.name) {
                    case 'ValidationError':
                        return callback(new Error(`[400] ${err.message}`));
                    default:
                        return callback(new Error('Couldn\'t save the item.'));
                }
            }

            callback(null, JSON.stringify(token));
        });
    });

};
