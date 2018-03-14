'use strict';

const aws = require('aws-sdk');
const request = require('request');
const uuidv1 = require('uuid/v1');
const environmentModel = require('../../../models/environment');
const pingedModel = require('../../../models/pinged');

let lambda = new aws.Lambda();

module.exports.monitors = (event, context, callback) => {

    let attributes = ['id', 'link', 'monitors'];
    environmentModel.model.scan('monitors').not().eq([]).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        let monitors = 0;
        results.forEach((environment) => {
            (environment.monitors || []).forEach((monitor) => {
                monitors++;

                let params = {
                    FunctionName: `PipelineDashboardApi-${process.env.STAGE}-ping`,
                    InvocationType: 'Event',
                    Payload: JSON.stringify({ body: { environment, monitor } }),
                };

                lambda.invoke(params, function(err, data) {
                    if (err) {
                        console.log(err);
                        return callback(new Error('Couldn\'t fetch the items.'));
                    } else {
                        console.log(data);
                    }
                });

            });
        });
    });

};

module.exports.ping = (event, context, callback) => {
    const body = event.body;
    const id = body.environment.id;
    const start = new Date();

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        let monitor = environment.monitors.filter((monitor) => monitor.id === body.monitor.id)[0];
        if (!environment || !monitor || !environment.link) {
            return callback(new Error('[404] Not found'));
        }

        request(environment.link + monitor.path, (error, response, body) => {
            if (error) { console.log(error); }

            const end = new Date() - start;

            let item = {
                id: uuidv1(),
                environmentId: environment.id,
                monitorId: monitor.id,
                url: environment.link + monitor.path,
                statusCode: response.statusCode,
                codeMatched: response.statusCode === monitor.expectedCode,
                textMatched: monitor.expectedText ? body.includes(monitor.expectedText) : true,
                duration: end
            };
            item.isValid = !!(item.codeMatched && item.textMatched);

            let pinged = new pingedModel.model(item);

            pinged.save(function (err) {
                if (err) {
                    console.log(err);
                    return callback(new Error(`[500] ${err.message}`));
                }

                environmentModel.model.update({ id }, {
                    pings: { valid: item.isValid ? environment.pings.valid + 1 : environment.pings.valid, invalid: !item.isValid ? environment.pings.invalid + 1 : environment.pings.invalid },
                    latestPing: pinged
                }, { updateTimestamps: false }, function (err) {
                    if (err) {
                        console.log(err);
                        switch(err.name) {
                            case 'ValidationError':
                                return callback(new Error(`[400] ${err.message}`));
                            default:
                                return callback(new Error(`[500] ${err.message}`));
                        }
                    }
                    callback(null, item);
                });
            });

        });

    });
};
