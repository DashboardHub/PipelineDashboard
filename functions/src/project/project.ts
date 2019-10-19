// 3rd party
import { firestore } from 'firebase-admin';
import { FirebaseAdmin, WriteResult } from '../client/firebase-admin';

export interface ProjectInput {
  projectUid: string;
  increase?: boolean;
}

export const updateViews: any = async (projectUid: string): Promise<WriteResult> => {
  return FirebaseAdmin
    .firestore()
    .collection('projects')
    .doc(projectUid)
    .set(
      {
        views: firestore.FieldValue.increment(1),
      },
      { merge: true });
}

export const updateFollowers: any = async (projectUid: string, increase: boolean): Promise<WriteResult> => {
  return FirebaseAdmin
    .firestore()
    .collection('projects')
    .doc(projectUid)
    .set(
      {
        followers: increase ? firestore.FieldValue.increment(1) : firestore.FieldValue.increment(-1),
      },
      { merge: true });
}
