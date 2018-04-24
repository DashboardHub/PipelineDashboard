export class Config {
  production: boolean;
  api: string;
  web: string;
  whitelist: Array<string>;
  version: string;

  auth: {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
}
