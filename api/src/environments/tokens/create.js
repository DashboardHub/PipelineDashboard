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
            if(err) { return console.log(err); }
            callback(null, JSON.stringify(token));
        });
    });

};
