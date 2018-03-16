'use strict';

const uuidv1 = require('uuid/v1');
const environment = require('../models/environment');

module.exports.create = (event, context, callback) => {
    const data = event.body;
    const params = {
        id: uuidv1(),
        type: data.type,
        owner: event.principalId,
        title: data.title,
        description: data.description,
        link: data.link,
        tags: data.tags,
        latestRelease: {},
        releases: 0,
        views: 0,
        isPrivate: false,
        tokens: [
            {
                id: uuidv1(),
                name: 'Continuous Integration Server',
            },
        ],
        logo: data.logo,
    };

    let environmentModel = new environment.model(params);
    environmentModel.save(function(err) {
        if (err) {
            console.log(err);
            switch (err.name) {
                case 'ValidationError':
                    return callback(new Error(`[400] ${err.message}`));
                default:
                    return callback(new Error('Couldn\'t save the item.'));
            }
        }

        callback(null, JSON.stringify(environmentModel));
    });
};
