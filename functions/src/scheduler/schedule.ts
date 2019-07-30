// 3rd party
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FirebaseAdmin } from '../client/firebase-admin';

// Dashboard Hub models
import { ProjectModel } from '../models/index.model';
import { deleteProjectPings } from '../project/delete-project';

type QuerySnapshot = firestore.QuerySnapshot;
type WriteResult = firestore.WriteResult;

export const deletePingsAfter30days: any = functions.pubsub.schedule('00 00 * * *').timeZone('UTC')
  .onRun(async () => {
    const snapshots: QuerySnapshot = await FirebaseAdmin.firestore()
      .collection('projects')
      .get();

    const promises: Promise<WriteResult>[] = [];

    snapshots.docs.forEach((doc: firestore.QueryDocumentSnapshot) => {
      promises.push(deleteProjectPings(<ProjectModel>doc.data(), true));
    });
    return Promise.all(promises);
  });
