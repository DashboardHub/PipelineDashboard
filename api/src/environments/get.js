'use strict';

const environmentModel = require('./../models/environment');
const progress = require('./../environments/_helpers/progress');

module.exports.public = (event, context, callback) => {
    const id = event.pathParameters.id;
    const isPrivate = false;

    environmentModel.model.get({ id, isPrivate }, function(err, environment) {
        if(err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment) {
            return callback(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 404,
                body: JSON.stringify({ message: 'Not found' })
            });
        }

        environmentModel.model.update({ id }, { views: environment.views + 1 }, { updateTimestamps: false }, function (err) {
            if (err) { console.log(err); }

            // remove private data
            delete environment.isPrivate;
            delete environment.tokens;

            return callback(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 200,
                body: JSON.stringify(progress.calculate(environment))
            });
        });
    });
};

module.exports.private = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function(err, environment) {
        if(err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }
        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, progress.calculate(environment));
    });
};
