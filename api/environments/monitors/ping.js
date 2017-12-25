'use strict';

const aws = require('aws-sdk');
const environmentModel = require('./../../models/environment');

let lambda = new AWS.Lambda();

module.exports.monitors = (event, context, callback) => {

    let attributes = ['id', 'monitors'];
    environmentModel.model.scan('monitors').not().eq([]).attributes(attributes).exec(function (err, results) {
        if (err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the items.'));
        }

        let monitors = 0;
        results.forEach((environment) => {
            environment.monitors.forEach((monitor) => {
                monitors++;



                // let params = {
                //     ClientContext: 'MyApp',
                //     FunctionName: 'MyFunction',
                //     InvocationType: 'Event',
                //     LogType: 'Tail',
                //     Payload: '<Binary String>',
                //     Qualifier: '1'
                // };
                //
                // lambda.invoke(params, function(err, data) {
                //     if (err) console.log(err, err.stack); // an error occurred
                //     else     console.log(data);           // successful response
                // });



            });
        });

        return callback(null, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                total: monitors
            })
        });
    });

};

module.exports.ping = (event, context, callback) => {



};
