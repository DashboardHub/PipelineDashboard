'use strict';

const aws = require('aws-sdk');
const url = require('url');
const http = require('http');
const https = require('https');
const uuidv1 = require('uuid/v1');
const environmentModel = require('./../../../models/environment');
const pingedModel = require('./../../../models/pinged');

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
        if (!environment || !monitor) {
            return callback(new Error('[404] Not found'));
        }

        const parts = url.parse(`${environment.link}${monitor.path}`);

        (parts.protocol === 'https' ? https : http).get({ hostname: parts.hostname, path: parts.path, port: parts.port }, (resp) => {
            const { statusCode } = resp;
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const end = new Date() - start;

                let item = {
                    id: uuidv1(),
                    environmentId: environment.id,
                    monitorId: monitor.id,
                    url: parts.href,
                    statusCode: statusCode,
                    codeMatched: statusCode === monitor.expectedCode,
                    textMatched: monitor.expectedText ? data.includes(monitor.expectedText) : true,
                    duration: end
                };

                let pinged = new pingedModel.model(item);

                pinged.save(function (err) {
                    if (err) {
                        console.log(err);
                        return callback(new Error(`[500] ${err.message}`));
                    }

                    environmentModel.model.update({ id }, {
                        pings: environment.pings + 1,
                        latestPing: pinged
                    }, function (err) {
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

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    });
};
