export const environment = {
  production: true,
  hmr: false,
  api: 'https://api-pipeline.dashboardhub.io',
  whitelist: ['api-pipeline.dashboardhub.io', 'https://api-pipeline.dashboardhub.io', 'api-pipeline.dashboardhub.io:443'],
  version: 'x.x.x',

  auth: {
    clientID: 'PEVMydSIuQhF4K2aLTQz36JEn2yczfDV',
    domain: 'dashboardhub.eu.auth0.com',
    callbackURL: 'https://pipeline.dashboardhub.io/callback'
  }
};
