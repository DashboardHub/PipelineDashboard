// Third party modules
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

// Dashboard hub firebase functions models/mappers
import { DocumentSnapshot } from './client/firebase-admin';

// Dashboard repositories
import { onCreateGitWebhookRepository, CreateGitWebhookRepositoryInput } from './repository/create-git-webhook-repository';
import { onCreateRepository } from './repository/create-repository';
import { getRepositoryInfo, RepositoryInfoInput } from './repository/info';
import { onResponseGitWebhookRepository } from './repository/response-git-webhook-repository';
import { onUpdateRepository } from './repository/update-repository';

// Dashboard users
import { onCreateUser } from './user/create-user';
import { getUserEvents, EventsInput } from './user/events';
import { getUserRepos, ReposInput } from './user/repos';
import { onUpdateUserStats } from './user/stats';
import { onUpdateUser } from './user/update-user';

// Dashboard projects
import { deleteMonitorPings, ping, MonitorInfoInput } from './monitor/monitor';
import { onDeleteProject } from './project/delete-project';
import { onUpdateProject } from './project/update-project';
import { onDeleteGitWebhookRepository, DeleteGitWebhookRepositoryInput } from './repository/delete-git-webhook-repository';

import { onCreatePings as onCreatePingsStats, onCreateProject as onCreateProjectStats, onCreateUser as onCreateUserStats } from './application/stats';
import { updateViews, ProjectInput } from './project/project';
import { deletePingsAfter30days, runAllMonitors60Mins } from './scheduler/schedule';


declare type HttpsFunction = functions.HttpsFunction;
declare type CloudFunction<T> = functions.CloudFunction<T>;
declare type Change<T> = functions.Change<T>;

export const findAllUserRepositories: HttpsFunction = functions.https.onCall((input: ReposInput, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
export const findAllUserEvents: HttpsFunction = functions.https.onCall((input: EventsInput, context: CallableContext) => getUserEvents(input.token, context.auth.uid, input.username));
export const findRepositoryInfo: HttpsFunction = functions.https.onCall((input: RepositoryInfoInput, context: CallableContext) => getRepositoryInfo(input.token, input.uid, input.fullName));
export const createGitWebhookRepository: HttpsFunction = functions.https.onCall((input: CreateGitWebhookRepositoryInput, context: CallableContext) => onCreateGitWebhookRepository(input.token, input.repositoryUid));
export const deleteGitWebhookRepository: HttpsFunction = functions.https.onCall((input: DeleteGitWebhookRepositoryInput, context: CallableContext) => onDeleteGitWebhookRepository(input.token, input.data));
export const responseGitWebhookRepository: HttpsFunction = onResponseGitWebhookRepository;
export const pingMonitor: HttpsFunction = functions.https.onCall((input: MonitorInfoInput, context: CallableContext) => ping(input.projectUid, input.monitorUid, input.type));
export const deletePingsByMonitor: HttpsFunction = functions.https.onCall((input: MonitorInfoInput, context: CallableContext) => deleteMonitorPings(input.projectUid, input.monitorUid));
export const updateProjectViews: HttpsFunction = functions.https.onCall((input: ProjectInput, context: CallableContext) => updateViews(input.projectUid));

export const deleteProject: CloudFunction<DocumentSnapshot> = onDeleteProject;
export const updateProject: CloudFunction<DocumentSnapshot> = onUpdateProject;
export const updateRepository: CloudFunction<Change<DocumentSnapshot>> = onUpdateRepository;
export const createRepository: CloudFunction<DocumentSnapshot> = onCreateRepository;
export const updateUserStats: CloudFunction<DocumentSnapshot> = onUpdateUserStats;
export const delete30DaysPings: CloudFunction<DocumentSnapshot> = deletePingsAfter30days;
export const runPings60Mins: CloudFunction<DocumentSnapshot> = runAllMonitors60Mins;
export const createUser: CloudFunction<DocumentSnapshot> = onCreateUser;
export const updateUser: CloudFunction<Change<DocumentSnapshot>> = onUpdateUser;

export const createProjectStat: CloudFunction<DocumentSnapshot> = onCreateProjectStats;
export const createPingsStats: CloudFunction<DocumentSnapshot> = onCreatePingsStats;
export const createUserStats: CloudFunction<DocumentSnapshot> = onCreateUserStats;
