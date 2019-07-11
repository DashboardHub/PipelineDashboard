import { FirebaseAdmin } from '../client/firebase-admin';
import { MonitorPing } from '../client/ping';
import { Logger } from './../client/logger';

export interface MonitorInfoInput {
  token: string;
  projectUid: string;
  monitorUid: string;
}

export const getMonitorPings: any = async (token: string, projectUid: string, monitorUid: string) => {
  return FirebaseAdmin.firestore()
    .collection('projects')
    .doc(projectUid)
    .get()
    .then(async (doc: any) => {
      Logger.info({
        projectUid: projectUid,
        doc: doc.data(),
      });
      const monitors: any = doc.data().monitors;
      const monitor: any = monitors.find((item: any) => item.uid === monitorUid);
      const uri: string = doc.data().url + monitor.path ;
      Logger.info({
        uri: uri,
      });
      const data: any = await Promise.all([
        MonitorPing(uri, token),
      ]);
      Logger.info({
        pingsData: data,
      });
      Logger.info({
        status: data.statusCode,
      })
    });
}
