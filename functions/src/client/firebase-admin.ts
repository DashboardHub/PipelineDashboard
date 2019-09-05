import * as admin from 'firebase-admin';

export const FirebaseAdmin: admin.app.App = admin.initializeApp();

export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot;
export declare type DocumentData = admin.firestore.DocumentData;
export declare type WriteResult = admin.firestore.WriteResult;
export declare type QuerySnapshot = admin.firestore.QuerySnapshot;
export declare type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
export declare type DocumentReference = admin.firestore.DocumentReference;
export declare type Transaction = admin.firestore.Transaction;
export declare type WriteBatch = admin.firestore.WriteBatch;
export declare type FieldValue = admin.firestore.FieldValue;
export declare type CollectionReference = admin.firestore.CollectionReference;
export declare type Query = admin.firestore.Query;

// tslint:disable-next-line: typedef
export const FieldPath = admin.firestore.FieldPath;

export const IncrementFieldValue: FieldValue = admin.firestore.FieldValue.increment(1);

