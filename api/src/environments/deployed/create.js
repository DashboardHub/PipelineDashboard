'use strict';

const aws = require('aws-sdk');

const uuidv1 = require('uuid/v1');
const environmentModel = require('../../models/environment');
const deployedModel = require('../../models/deployed');

let lambda = new aws.Lambda();

module.exports.create = (event, context, callback) => {
    const id = event.path.id;
    const tokenId = event.path.tokenId;
    const state = event.path.state;
    const data = event.body;

    environmentModel.model.get({ id }, function (err, environment) {
        if (err) {
            console.error(err);
            return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment) { return callback(new Error('[404] Not found')); }

        let token = environment.tokens.filter((token) => token.id === tokenId);

        if (token.length !== 1) {
            return callback(new Error('[404] Not found'));
        }

        switch (environment.type) {
            case 'build':
                if (!['startBuild', 'finishBuild', 'failBuild'].includes(state)) {
                    return callback(new Error(`[400] Deploy state "${state}" not allow in this Environment type "${environment.type}"`));
                }
                break;
            case 'deploy':
                if (!['startDeploy', 'finishDeploy', 'failDeploy'].includes(state)) {
                    return callback(new Error(`[400] Deploy state "${state}" not allow in this Environment type "${environment.type}"`));
                }
                break;
            case 'build-deploy':
                if (!['startBuild', 'finishBuild', 'failBuild', 'startDeploy', 'finishDeploy', 'failDeploy'].includes(state)) {
                    return callback(new Error(`[400] Deploy state "${state}" not allow in this Environment type "${environment.type}"`));
                }
                break;
        }

        let item = {
            id: uuidv1(),
            environmentId: environment.id,
            release: data.release,
            state: state,
            token: {
                name: token[0].name
            }
        };
        let deploy = new deployedModel.model(item);

        deploy.save(function (err) {
            if (err) {
                console.log(err);
                switch(err.name) {
                    case 'ValidationError':
                        return callback(new Error(`[400] ${err.message}`));
                    default:
                        return callback(new Error(`[500] ${err.message}`));
                }
            }

            if (state === 'finishDeploy') {
                (environment.monitors || []).forEach((monitor) => {
                    let params = {
                        FunctionName: `PipelineDashboardApi-${process.env.STAGE}-ping`,
                        InvocationType: 'Event',
                        Payload: JSON.stringify({ body: { environment, monitor } }),
                    };

                    lambda.invoke(params, function(err, data) {
                        if (err) {
                            console.log(err);
                            return callback(new Error('Couldn\'t fetch the items.'));
                        } else {
                            console.log(data);
                        }
                    });
                });
            }

            environmentModel.model.update({ id }, {
                releases: environment.releases + 1,
                latestRelease: deploy,
                tokens: environment.tokens.map((t) => {
                    if (t.id === token[0].id) {
                        t.lastUsed = new Date();
                    }
                    return t;
                })
            }, function (err) {
                if (err) {
                    console.log(err);
                    switch(err.name) {
                        case 'ValidationError':
                            return callback(new Error(`[400] ${err.message}`));
                        default:
                            return callback(new Error(`[500] ${err.message}`));
                    }
                }
                return callback(null, JSON.stringify(item));
            });
        });
    });
};
