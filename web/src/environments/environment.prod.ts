import { Config } from './config.model';

export const environment: Config = {
  production: true,
  api: 'https://api-pipeline.dashboardhub.io',
  web: 'https://pipeline.dashboardhub.io',
  whitelist: [/^null$/],
  version: 'x.x.x',

  auth: {
    clientID: 'PEVMydSIuQhF4K2aLTQz36JEn2yczfDV',
    domain: 'dashboardhub.eu.auth0.com',
    callbackURL: 'https://pipeline.dashboardhub.io/callback'
  }
};
