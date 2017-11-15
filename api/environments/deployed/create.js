'use strict';

const uuidv1 = require('uuid/v1');
const environmentModel = require('../../models/environment');
const deployedModel = require('../../models/deployed');

module.exports.create = (event, context, callback) => {
    const id = event.path.id;
    const tokenId = event.path.tokenId;
    const data = event.body;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        let token = environment.tokens.filter((token) => token.id === tokenId);

        if (token.length !== 1) {
            return callback(new Error('[404] Not found'));
        }

        // @TODO: add validation to model
        // if (typeof data.release !== 'string' || !validator.isLength(data.release, {min: 3, max: 32})) {
        //     return callback(new Error('[400] Validation Error: "release" is required and must be a "string" between 3 and 32'));
        // }

        let item = {
            id: uuidv1(),
            environmentId: environment.id,
            token: token[0],
            release: data.release
        };
        let deploy = new deployedModel.model(item);
        deploy.save(function (err) {
            if(err) { return console.log(err); }
            callback(null, item);
        });
    });
};
