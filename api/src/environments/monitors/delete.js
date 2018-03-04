'use strict';

const environmentModel = require('../../models/environment');
const pingedModel = require('../../models/pinged');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;
    const monitorId = event.path.monitorId;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        let monitors = environment.monitors.filter((monitor) => monitor.id !== monitorId);

        pingedModel.model.scan('monitorId').contains(monitorId).exec(function (err, results) {

            let deletes = results.map((item) => ({ id: item.id }));

            if (deletes.length > 0) {
                pingedModel.model.batchDelete(deletes, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    environmentModel.model.update({ id }, { monitors }, { allowEmptyArray: true }, function (err) {
                        if (err) {
                            return console.log(err);
                        }

                        callback(null, JSON.stringify(
                            {
                                total: monitors.length,
                                list: monitors
                            }
                        ));
                    });
                });
            } else {
                environmentModel.model.update({ id }, { monitors }, { allowEmptyArray: true }, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    callback(null, JSON.stringify(
                        {
                            total: monitors.length,
                            list: monitors
                        }
                    ));
                });
            }
        });
    });

};
