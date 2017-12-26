'use strict';

const aws = require('aws-sdk');
const https = require('https');
const uuidv1 = require('uuid/v1');
const environmentModel = require('./../../models/environment');
const monitoredModel = require('./../../models/monitored');

let lambda = new aws.Lambda();

module.exports.monitors = (event, context, callback) => {

    let attributes = ['id', 'url', 'monitors'];
    environmentModel.model.scan('monitors').not().eq([]).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        let monitors = 0;
        results.forEach((environment) => {
            environment.monitors.forEach((monitor) => {
                monitors++;

                let params = {
                    FunctionName: 'ping',
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

    https.get(`${body.environment.url}${body.monitor.path}`, (resp) => {
        const { statusCode } = res;
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
                url: body.environment.url + body.monitor.path,
                codeMatched: statusCode === body.monitor.expectedCode,
                textMatched: data.includes(body.monitor.expectedText),
                duration: end
            };
            let monitored = new monitoredModel.model(item);

            monitored.save(function (err) {
                if (err) {
                    console.log(err);
                    return callback(new Error(`[500] ${err.message}`));
                }

                return callback(null, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    statusCode: 200,
                    body: JSON.stringify(item)
                });
            });
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};
