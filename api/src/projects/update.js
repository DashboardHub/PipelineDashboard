'use strict';

const projectModel = require('./../models/project');

module.exports.update = (event, context, callback) => {
    const id = event.path.id;
    const data = event.body;

    projectModel.model.get({ id }, function(err, project) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!project || project.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        if (data) {
            if (!Array.isArray(data)) {
                return callback(new Error('[400] Validation Error: "patch" must be an "array" of operations'));
            }
        }

        data.map((item) => {
            if (item.op === undefined || item.path === undefined || item.value === undefined) {
                return callback(new Error('[400] Validation Error: each "patch" item must be have a "op", "path", "value"'));
            }

            switch (item.path) {
                case '/title':
                case '/description':
                case '/environments':
                    project[item.path.substr(1)] = item.value;
                    break;
            }
        });

        projectModel.model.update({ id },
                { title: project.title, description: project.description, environments: project.environments },
                function(err) {
                    if (err) {
                        console.log(err);
                        switch (err.name) {
                            case 'ValidationError':
                                return callback(new Error(`[400] ${err.message}`));
                            default:
                                return callback(new Error('Couldn\'t update the item.'));
                        }
                    }

                    callback(null, project);
                });
    });
};
