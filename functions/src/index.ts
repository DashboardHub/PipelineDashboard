import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { getRepositoryInfo, RepositoryInfoInput } from './repository/info';

import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { ProjectModel } from './models/index.model';
import { deleteMonitorPings, deleteProjectPings, ping, MonitorInfoInput } from './monitor/monitor';
import { getUserEvents, EventsInput } from './user/events';
import { getUserRepos, ReposInput } from './user/repos';

declare type HttpsFunction = functions.HttpsFunction;

export * from './user/stats';

export const findAllUserRepositories: HttpsFunction = functions.https.onCall((input: ReposInput, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
export const findAllUserEvents: HttpsFunction = functions.https.onCall((input: EventsInput, context: CallableContext) => getUserEvents(input.token, context.auth.uid, input.username));
export const findRepositoryInfo: HttpsFunction = functions.https.onCall((input: RepositoryInfoInput, context: CallableContext) => getRepositoryInfo(input.token, input.fullName));
export const pingMonitor: HttpsFunction = functions.https.onCall((input: MonitorInfoInput, context: CallableContext) => ping(input.projectUid, input.monitorUid));
export const deletePingsByMonitor: HttpsFunction = functions.https.onCall((input: MonitorInfoInput, context: CallableContext) => deleteMonitorPings(input.projectUid, input.monitorUid));
exports.deleteProjectPings = functions.firestore.document('projects/{projectID}').onDelete((snap: DocumentSnapshot) => {
  const data: ProjectModel = snap.data();
  deleteProjectPings(data.uid)
});
