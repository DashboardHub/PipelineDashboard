import * as admin from 'firebase-admin';

export const FirebaseAdmin: admin.app.App = admin.initializeApp();

export * from './user/repos';
export * from './user/events';
export * from './repository/info';
