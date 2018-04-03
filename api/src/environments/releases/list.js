'use strict';

const _ = require('lodash');

const deployedModel = require('../../models/deployed');
const environmentModel = require('../../models/environment');

module.exports.list = (event, context, callback) => {
    const id = event.path.id;

    environmentModel.model.get({ id }, function(err, environment) {
        if(err) {
          console.log(err);
          return callback(new Error('Couldn\'t fetch the item.'));
        }

        if (!environment || environment.owner !== event.principalId) {
            return callback(new Error('[404] Not found'));
        }

        deployedModel.model.scan('environmentId').contains(id).exec(function (err, deploys) {
            if (err) {
                console.log(err);
                return callback(new Error('Couldn\'t fetch the items.'));
            }

            let states = deploys.reduce((tally, deploy) => {
                if (!tally[deploy.release]) {
                    tally[deploy.release] = {
                        version: deploy.release,
                        token: deploy.token
                    };
                }

                tally[deploy.release][deploy.state] = deploy.createdAt;
                return tally;
            }, {});

            let releases = [];

            Object.values = obj => Object.keys(obj).map(key => obj[key]); // @TODO: temporary fix for older lambda
            Object.values(states).forEach((release) => {
                release = {
                    version: release.version,
                    token: release.token,
                    failDeploy: release.failDeploy || null,
                    finishDeploy: release.finishDeploy || null,
                    startDeploy: release.startDeploy || null,
                    failBuild: release.failBuild || null,
                    finishBuild: release.finishBuild || null,
                    startBuild: release.startBuild || null,
                    latest: {
                        createdAt: release.failDeploy || release.failBuild || release.finishDeploy || release.startDeploy || release.finishBuild || release.startBuild,
                        state: release.failDeploy ? 'failDeploy' : release.failBuild ? 'failBuild' : release.finishDeploy ? 'finishDeploy' : release.startDeploy ? 'startDeploy' : release.finishBuild ? 'finishBuild' : release.startBuild ? 'startBuild' : null
                    }
                };

                release.duration = (new Date(release.finishDeploy || release.failDeploy || release.finishBuild || release.failBuild).getTime() - new Date(release.startBuild || release.startDeploy).getTime()) / 1000;

                releases.push(release);
            });

            callback(null, {
                total: releases.length,
                list: _.orderBy(releases, ['latest.createdAt'], ['desc'])
            });
        });
    });

};
