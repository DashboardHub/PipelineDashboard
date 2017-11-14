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

        if (environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        // @TODO: add validation to model
        // if (typeof data.name !== 'string' || !validator.isLength(data.name, {min: 3, max: 32})) {
        //     return callback(new Error('[400] Validation Error: "title" is required and must be a "string" between 3 and 32'));
        // }

        let token = {
            id: uuidv1(),
            environmentId: id,
            name: data.name,
            token: uuidv1()
        };

        environment.tokens.push(token);
        environmentModel.model.update({ id }, { tokens: environment.tokens }, function (err) {
            if(err) { return console.log(err); }
            callback(null, JSON.stringify(token));
        });
    });

};
