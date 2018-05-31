'use strict';

const uuidv1 = require('uuid/v1');
const project = require('../models/project');

module.exports.create = (event, context, callback) => {
    const data = event.body;
    const params = {
        id: uuidv1(),
        owner: event.principalId,
        title: data.title,
        description: data.description
    };

    let projectModel = new project.model(params);
    projectModel.save(function(err) {
        if (err) {
            console.log(err);
            switch (err.name) {
                case 'ValidationError':
                    return callback(new Error(`[400] ${err.message}`));
                default:
                    return callback(new Error('Couldn\'t save the item.'));
            }
        }

        callback(null, JSON.stringify(projectModel));
    });
};
