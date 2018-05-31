'use strict';

const projectModel = require('./../models/project');

module.exports.public = (event, context, callback) => {
    const id = event.pathParameters.id;
    const isPrivate = false;

    projectModel.model.get({ id, isPrivate }, function(err, project) {
        if(err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!project) {
            return callback(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 404,
                body: JSON.stringify({ message: 'Not found' })
            });
        }

        // projectModel.model.update({ id }, { views: project.views + 1 }, { updateTimestamps: false }, function (err) {
        //     if (err) { console.log(err); }

            // remove private data
            delete project.isPrivate;

            return callback(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 200,
                body: JSON.stringify(project)
            });
        // });
    });
};

module.exports.private = (event, context, callback) => {
    const id = event.path.id;

    projectModel.model.get({ id }, function(err, project) {
        if(err) {
            console.log(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }
        if (!project || project.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        return callback(null, project);
    });
};
