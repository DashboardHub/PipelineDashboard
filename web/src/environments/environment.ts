// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000',
  version: 'x.x.x',

  auth: {
    clientID: 'ZA6c3uT9rQk2PkE0L48CxBaqcZYQBZqu',
    domain: 'dashboardhub-dev.eu.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
  }
};
