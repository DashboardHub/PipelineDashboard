'use strict';

const uuidv1 = require('uuid/v1');
const environment = require('./../models/environment');

module.exports.create = (event, context, callback) => {
    const data = event.body;
    const id = uuidv1();
    const params = {
        id: id,
        type: data.type,
        owner: event.principalId,
        title: data.title,
        description: data.description,
        link: data.link,
        tags: data.tags,
        latestRelease: null,
        releases: 0,
        isPrivate: false,
        tokens: [
            {
                id: uuidv1(),
                environmentId: id,
                name: 'Continuous Integration Server',
                token: uuidv1()
            }
        ]
    };

    let environmentModel = new environment.model(params);
    environmentModel.save(function (err) {
        if (err) {
            console.log(err);
            switch(err.name) {
                case 'ValidationError':
                    return callback(new Error(`[400] ${err.message}`));
                default:
                    return callback(new Error(`[500] ${err.message}`));
            }
        }

        callback(null, JSON.stringify(params));
    });
};
