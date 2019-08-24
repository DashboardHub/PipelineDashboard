import * as admin from 'firebase-admin';

export const FirebaseAdmin: admin.app.App = admin.initializeApp();

export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;
export declare type WriteResult = admin.firestore.WriteResult;
export declare type QuerySnapshot = admin.firestore.QuerySnapshot;
export declare type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
export declare type DocumentReference = admin.firestore.DocumentReference;

