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

        if (!environment) { return callback(new Error('[404] Not found')); }

        let token = environment.tokens.filter((token) => token.id === tokenId);

        if (token.length !== 1) {
            return callback(new Error('[404] Not found'));
        }

        let item = {
            id: uuidv1(),
            environmentId: environment.id,
            token: token[0],
            release: data.release
        };
        let deploy = new deployedModel.model(item);

        deploy.save(function (err) {
            if (err) {
                console.log(err);
                switch(err.name) {
                    case 'ValidationError':
                        return callback(new Error(`[400] ${err.message}`));
                        break;
                    default:
                        return callback(new Error(`[500] ${err.message}`));
                }
            }

            environmentModel.model.update({ id }, {
                releases: environment.releases + 1,
                latestRelease: item
            }, function (err) {
                if (err) {
                    console.log(err);
                    return callback(new Error(`[500] ${err.message}`));
                }
                callback(null, item);
            });
        });
    });
};
