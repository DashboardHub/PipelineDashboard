import { Config } from './config.model';

export const environment: Config = {
  production: false,
  version: 'x.x.x',

  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
  },

  tracking: '',
};
