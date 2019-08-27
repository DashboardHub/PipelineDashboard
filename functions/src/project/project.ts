// 3rd party
import { firestore } from 'firebase-admin';
import { FirebaseAdmin } from '../client/firebase-admin';

export interface ProjectInput {
  projectUid: string
}

export const updateViews: any = async (projectUid: string): Promise<void> => {

  // Update views of the project
  await FirebaseAdmin
    .firestore()
    .collection('projects')
    .doc(projectUid)
    .set(
      {
        views: firestore.FieldValue.increment(1),
      },
      { merge: true });
}
