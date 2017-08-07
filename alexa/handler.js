'use strict';
const https = require('https');

module.exports.list = (event, context, callback) => {

    const url = process.env.API_URL;
    https.get(url, res => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);

            let environments = body.list.map((environment) => {
                let status = environment.latestRelease === null ? 'has no deployment' : `has version ${environment.latestRelease}`;
                return `Environment ${environment.title} ${status}`
            });

            callback(null, {
                version: '1.0',
                response: {
                    outputSpeech: {
                        type: 'PlainText',
                        text: `There are ${body.total} environments in total. ${environments.join(', ')}`,
                    },
                    shouldEndSession: false,
                },
            });
        });
    });
};
