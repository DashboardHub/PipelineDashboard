// 3rd party
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FirebaseAdmin } from '../client/firebase-admin';

// Dashboard Hub models
import { Logger } from '../client/logger';
import { MonitorModel, ProjectModel } from '../models/index.model';
import { ping } from '../monitor/monitor';
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

export const runAllMonitors60Mins: any = functions.pubsub.schedule('every 60 mins')
  .onRun(async () => {
    const snapshots: QuerySnapshot = await FirebaseAdmin.firestore()
      .collection('projects')
      .get();
    
    const promises: Promise<WriteResult>[] = [];  
    let project: ProjectModel;
    snapshots.docs.forEach(async (doc: firestore.QueryDocumentSnapshot) => {
      project = <ProjectModel>doc.data();
      try {
        if (project.url && Array.isArray(project.monitors) && project.monitors.length > 0) {
          project.monitors.forEach((monitor: MonitorModel) => promises.push(ping(project.uid, monitor.uid)));
        }
      } catch (err) {
        Logger.error(err);
        throw new Error(err);
      }
    });
    return Promise.all(promises);
  });
