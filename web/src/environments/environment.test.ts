import { Config } from './config.model';

export const environment: Config = {
  production: true,
  api: 'https://api-pipeline-test.dashboardhub.io',
  web: 'http://pipeline-test.dashboardhub.io',
  whitelist: new Array(new RegExp('^null$')),
  version: 'x.x.x',

  auth: {
    clientID: 'a56FRD96UfwmAVLnMK7XEgA9TAjdiXVd',
    domain: 'dashboardhub-test.eu.auth0.com',
    callbackURL: 'http://pipeline-test.dashboardhub.io/callback'
  }
};
