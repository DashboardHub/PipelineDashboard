'use strict';

module.exports.calculateAll = (environments) => {
    return environments.map((environment) => this.calculate(environment));
};

module.exports.calculate = (environment) => {
    if (environment.latestRelease) {
        switch (environment.type) {
            case 'build':
                switch (environment.latestRelease.state) {
                    case 'startBuild':
                        environment.progress = { current: 50, next: 75 };
                        break;
                    case 'finishBuild':
                    case 'failBuild':
                        environment.progress = { current: 100, next: 100 };
                        break;
                    default:
                        environment.progress = { current: 0, next: 0 };
                }
                break;
            case 'deploy':
                switch (environment.latestRelease.state) {
                    case 'startDeploy':
                        environment.progress = { current: 50, next: 75 };
                        break;
                    case 'finishDeploy':
                    case 'failDeploy':
                        environment.progress = { current: 100, next: 100 };
                        break;
                    default:
                        environment.progress = { current: 0, next: 0 };
                }
                break;
            case 'build-deploy':
            default:
                switch (environment.latestRelease.state) {
                    case 'startBuild':
                        environment.progress = { current: 25, next: 50 };
                        break;
                    case 'finishBuild':
                        environment.progress = { current: 50, next: 75 };
                        break;
                    case 'startDeploy':
                        environment.progress = { current: 75, next: 100 };
                        break;
                    case 'finishDeploy':
                    case 'failBuild':
                    case 'failDeploy':
                        environment.progress = { current: 100, next: 100 };
                        break;
                    default:
                        environment.progress = { current: 0, next: 0 };
                }
                break;
        }
    }

    return environment;
};
