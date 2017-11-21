'use strict';

const environmentModel = require('./../models/environment');

module.exports.update = (event, context, callback) => {
    const id = event.path.id;
    const data = event.body;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        if (data) {
            if (!Array.isArray(data)) {
                return callback(new Error('[400] Validation Error: "patch" must be an "array" of operations'));
            }
        }

        // @TODO: add validation to model
        // if (typeof data.title !== 'string' || !validator.isLength(data.title, {min: 3, max: 32})) {
        //     return callback(new Error('[400] Validation Error: "title" is required and must be a "string" between 3 and 32'));
        // }
        //
        // if (data.description) {
        //     if (typeof data.description !== 'string' || !validator.isLength(data.description, {min: 3, max: 1024})) {
        //         return callback(new Error('[400] Validation Error: "description" is optional but a "string" must be between 3 and 1024'));
        //     }
        // }
        //
        // if (data.tags) {
        //     if (!Array.isArray(data.tags)) {
        //         return callback(new Error('[400] Validation Error: "tags" is optional but must be an "array"'));
        //     }
        // }
        //
        // if (data.isPrivate) {
        //     if (typeof data.isPrivate !== 'boolean') {
        //         return callback(new Error('[400] Validation Error: "isPrivate" is optional but must be a "boolean"'));
        //     }
        // }

        data.map((item) => {
            if (item.op === undefined || item.path === undefined || item.value === undefined) {
                return callback(new Error('[400] Validation Error: each "patch" item must be have a "op", "path", "value"'));
            }

            switch (item.path) {
                case '/title':
                case '/description':
                case '/link':
                    environment[item.path.substr(1)] = item.value;
                    break;
            }
        });

        environmentModel.model.update({ id }, { title: environment.title, description: environment.description, link: environment.link }, function (err) {
            if(err) { return console.log(err); }
            callback(null, environment);
        });
    });
};
