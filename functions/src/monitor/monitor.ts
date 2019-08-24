// 3rd party
import { firestore } from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { FirebaseAdmin } from '../client/firebase-admin';

// DashboardHub
import { Ping, PingResponse } from '../client/ping';
import { MonitorModel, PingModel, PingType, ProjectModel } from './../models/index.model';

type Document = FirebaseFirestore.DocumentSnapshot
type QuerySnapshot = firestore.QuerySnapshot;
type WriteResult = firestore.WriteResult;

export interface MonitorInfoInput {
  projectUid: string;
  monitorUid: string;
  type: string;
}

export const ping: any = async (projectUid: string, monitorUid: string, type: PingType = 'scheduler'): Promise<WriteResult | boolean> => {
  const document: Document = await FirebaseAdmin.firestore()
    .collection('projects')
    .doc(projectUid)
    .get();
  const project: ProjectModel = <ProjectModel>document.data();
  const monitor: MonitorModel = project.monitors.find((item: MonitorModel) => item.uid === monitorUid);
  const url: string = project.url + monitor.path;
  const uid: string = uuid();

  // if project does not have a url, do not continue
  if (project.url.length === 0) {
    return Promise.resolve(false);
  }

  const start: number = Date.now();
  let response: PingResponse;
  try {
    response = await Ping<PingResponse>(url);
  } catch (error) {
    response = {
      statusCode: error.statusCode,
      body: error.message,
    }
  }
  const end: number = Date.now();
  const pingResult: PingModel = {
    uid: uid,
    monitorUid: monitorUid,
    statusCode: response.statusCode,
    expectedCode: monitor.expectedCode,
    expectedText: monitor.expectedText,
    url: url,
    duration: end - start,
    codeMatched: monitor.expectedCode === response.statusCode,
    textMatched: monitor.expectedText ? response.body.includes(monitor.expectedText) : true,
    createdOn: firestore.Timestamp.fromDate(new Date()),
    type: type,
  };
  pingResult.isValid = !!(pingResult.codeMatched && pingResult.textMatched);

  // Updating monitor with latest ping information
  monitor.latestPing = pingResult;

  // Updating success and unsuccessful ping counts
  if (pingResult.isValid) {
    monitor.successfulPings = monitor.successfulPings ? monitor.successfulPings + 1 : 1;
  } else {
    monitor.unsuccessfulPings = monitor.unsuccessfulPings ? monitor.unsuccessfulPings + 1 : 1;
  }

  // Update monitor in the database
  await FirebaseAdmin
    .firestore()
    .collection('projects')
    .doc(projectUid)
    .set(
      {
        monitors: project.monitors,
        updatedOn: new Date(),
      },
      { merge: true });

  return FirebaseAdmin
    .firestore()
    .collection(`projects/${projectUid}/pings`)
    .doc(uid)
    .set(pingResult);
}

export const deleteMonitorPings: any = async (projectUid: string, monitorUid: string, isExpiredPings: boolean): Promise<WriteResult[]> => {
  const snapshots: QuerySnapshot = await FirebaseAdmin.firestore()
    .collection(`projects/${projectUid}/pings`)
    .where('monitorUid', '==', monitorUid)
    .get();

  const promises: Promise<WriteResult>[] = [];

  snapshots.docs.forEach((doc: firestore.QueryDocumentSnapshot) => {

    // Delete pings sub collection if more than 30 days
    if (isExpiredPings) {
      const currentPing: PingModel = <PingModel>doc.data();
      const timeDiff: number = firestore.Timestamp.fromDate(new Date()).toMillis() - currentPing.createdOn.toMillis();
      const days: number = timeDiff / (1000 * 60 * 60 * 24);
      if (days > 30) {
        promises.push(doc.ref.delete());
      }
    }

    // Delete pings when deleted by monitor
    if (!isExpiredPings) {
      promises.push(doc.ref.delete());
    }
  });

  return Promise.all(promises);
}
