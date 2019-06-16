import { Config } from './config.model';

export const environment: Config = {
  production: true,
  version: 'x.x.x',

  firebase: {
    apiKey: '{{ FIREBASE_API_KEY }}',
    authDomain: '{{ FIREBASE_AUTH_DOMAIN }}',
    databaseURL: '{{ FIREBASE_DATABASE_URL }}',
    projectId: '{{ FIREBASE_PROJECT_ID }}',
    storageBucket: '{{ FIREBASE_STORAGE_BUCKET }}',
    messagingSenderId: '{{ FIREBASE_MESSAGING_SEND_ID }}',
  },
};
