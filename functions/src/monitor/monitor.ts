// 3rd party
import { firestore } from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { FirebaseAdmin } from '../client/firebase-admin';

// DashboardHub
import { Ping, PingResponse } from '../client/ping';
import { MonitorModel, PingModel, ProjectModel } from './../models/index.model';

type Document = FirebaseFirestore.DocumentSnapshot
type QuerySnapshot = firestore.QuerySnapshot;

export interface MonitorInfoInput {
  projectUid: string;
  monitorUid: string;
}

export const ping: any = async (projectUid: string, monitorUid: string) => {
  const document: Document = await FirebaseAdmin.firestore()
    .collection('projects')
    .doc(projectUid)
    .get();
  const project: ProjectModel = <ProjectModel> document.data();
  const monitor: MonitorModel = project.monitors.find((item: MonitorModel) => item.uid === monitorUid);
  const url: string = project.url + monitor.path;
  const uid: string = uuid();

  const start: number = (new Date()).getMilliseconds();
  const response: PingResponse = await Ping<PingResponse>(url);
  const end: number = (new Date()).getMilliseconds();
  const pingResult: PingModel = {
    monitorUid: monitorUid,
    statusCode: response.statusCode,
    expectedCode: monitor.expectedCode,
    expectedText: monitor.expectedText,
    url: url,
    duration: end - start,
    codeMatched: monitor.expectedCode === response.statusCode,
    textMatched: monitor.expectedText ? response.body.includes(monitor.expectedText) : true,
    createdOn: firestore.Timestamp.fromDate(new Date()),
  };
  pingResult.isValid = !!(pingResult.codeMatched && pingResult.textMatched);

  await FirebaseAdmin
    .firestore()
    .collection(`projects/${projectUid}/pings`)
    .doc(uid)
    .set(pingResult);

  return pingResult;
}

export const deleteMonitorPings: any = async (projectUid: string, monitorUid: string) => {
  const snapshots: QuerySnapshot = await FirebaseAdmin.firestore()
    .collection(`projects/${projectUid}/pings`)
    .where('monitorUid', '==', monitorUid)
    .get()

  snapshots.docs.forEach((doc: firestore.QueryDocumentSnapshot) => {
    doc.ref.delete();
  });
}
