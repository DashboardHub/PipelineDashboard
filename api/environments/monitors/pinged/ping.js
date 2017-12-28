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
                    Payload: JSON.stringify({ environment, monitor }),
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
    const start = new Date();

    const parts = url.parse(`${body.environment.link}${body.monitor.path}`);

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
                environmentId: body.environment.id,
                monitorId: body.monitor.id,
                url: parts.href,
                statusCode: statusCode,
                codeMatched: statusCode === body.monitor.expectedCode,
                textMatched: body.monitor.expectedText ? data.includes(body.monitor.expectedText) : true,
                duration: end
            };

            let pinged = new pingedModel.model(item);

            pinged.save(function (err) {
                if (err) {
                    console.log(err);
                    return callback(new Error(`[500] ${err.message}`));
                }

                return callback(null, item);
            });
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};
