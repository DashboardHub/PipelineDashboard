'use strict';

const projectModel = require('../models/project');

module.exports.delete = (event, context, callback) => {
    const id = event.path.id;

    projectModel.model.get({ id }, function (err, project) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!project || project.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        project.delete(function (err) {
            if(err) { return console.log(err); }
            callback(null, {});
        });
    });

};
