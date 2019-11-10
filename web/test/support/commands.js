// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');
const firebase = Cypress.config().firebase;
const app = admin.initializeApp({credential: firebase, databaseURL: firebase.databaseURL});

