'use strict';

const deployed = require('./../models/deployed');
const environmentModel = require('./../models/environment');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        deployed.model.scan('environmentId').contains(id).exec(function (err, results) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            let deletes = results.map((item) => ({ id: item.id}));

            if (deletes.length > 0) {
                deployed.model.batchDelete(deletes, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    environment.delete(function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        callback(null, {});
                    });
                });
            } else {
                environment.delete(function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    callback(null, {});
                });
            }
        });
    });
};
