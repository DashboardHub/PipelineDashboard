// 3rd party
import { v4 as uuid } from 'uuid';
import { FirebaseAdmin } from '../client/firebase-admin';

// DashboardHub
import { Ping, PingResponse } from '../client/ping';
import { Logger } from './../client/logger';
import { MonitorModel, PingModel, ProjectModel } from './../models/index.model';

type Document = FirebaseFirestore.DocumentSnapshot
type DocumentReference = FirebaseFirestore.DocumentReference;

export interface MonitorInfoInput {
  projectUid: string;
  monitorUid: string;
}

export const getMonitorPings: any = async (projectUid: string, monitorUid: string) => {
  const document: Document = await FirebaseAdmin.firestore()
    .collection('projects')
    .doc(projectUid)
    .get();
  const project: ProjectModel = <ProjectModel> document.data();
  const monitor: MonitorModel = project.monitors.find((item: MonitorModel) => item.uid === monitorUid);
  const uri: string = project.url + monitor.path;
  const uid: string = uuid();

  const start: number = (new Date()).getMilliseconds();
  const response: PingResponse = await Ping<PingResponse>(uri);
  Logger.info(response);
  const end: number = (new Date()).getMilliseconds();
  const pingResult: PingModel = {
    statusCode: response.statusCode,
    expectedCode: monitor.expectedCode,
    expectedText: monitor.expectedText,
    fullUrl: uri,
    duration: end - start, // Milliseconds
    codeMatched: monitor.expectedCode === response.statusCode,
    textMatched: monitor.expectedText ? response.body.includes(monitor.expectedText) : true,
  };
  pingResult.isValid = !!(pingResult.codeMatched && pingResult.textMatched);

  Logger.info(pingResult);

  await FirebaseAdmin
    .firestore()
    .collection(`projects/${projectUid}/${monitorUid}`)
    .doc(uid)
    .set(pingResult);

  return pingResult;
}

export const deleteMonitorPings: any = async (projectUid: string, monitorUid: string) => {
  const documents: DocumentReference[] = await FirebaseAdmin.firestore()
    .collection(`projects/${projectUid}/${monitorUid}`)
    .listDocuments()
  documents.forEach((doc: any) => {
    doc.delete();
  });
}
