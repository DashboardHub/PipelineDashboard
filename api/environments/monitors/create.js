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

        // for older data where property might not exist yet
        if (!environment.monitors) {
            environment.monitors = [];
        }

        if (environment.monitors.length >= 1) {
            return callback(new Error('[400] Monitor limit reached'));
        }

        let monitor = {
            id: uuidv1(),
            path: data.path,
            method: data.method,
            expectedCode: data.expectedCode,
            expectedText: data.expectedText
        };

        environment.monitors.push(monitor);
        environmentModel.model.update({ id }, { monitors: environment.monitors }, function (err) {
            if(err) { return console.log(err); }
            callback(null, JSON.stringify(monitor));
        });
    });

};
