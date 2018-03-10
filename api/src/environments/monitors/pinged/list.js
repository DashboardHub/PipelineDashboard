'use strict';

const environmentModel = require('../../../models/environment');
const pingedModel = require('../../../models/pinged');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;
    const monitorId = event.path.monitorId;

    environmentModel.model.get({ id }, function(err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId || !environment.monitors.filter((monitor) => monitor.id === monitorId)) {
            return callback(new Error('[404] Not found'));
        }

        pingedModel.model.scan('monitorId').contains(monitorId).exec(function (err, pings) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            callback(null, {
                total: pings.length,
                list: pings
            });
        });
    });

};
