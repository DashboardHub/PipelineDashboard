'use strict';

const uuidv1 = require('uuid/v1');
const environment = require('./../models/environment');

module.exports.create = (event, context, callback) => {
    const data = event.body;

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

    const params = {
        id: uuidv1(),
        owner: event.principalId,
        title: data.title,
        description: data.description,
        link: data.link,
        tags: data.tags,
        latestRelease: null,
        releases: 0,
        isPrivate: false,
        tokens: []
    };

    let environmentModel = new environment.model(params);
    environmentModel.save(function (err) {
        if(err) { return console.log(err); }
        callback(null, JSON.stringify(params));
    });
};
