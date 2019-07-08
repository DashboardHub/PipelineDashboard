// Third party modules
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

// Dashboard hub firebase functions models/mappers
import { DocumentSnapshot } from './client/firebase-admin';

// Dashboard repositories
import { onCreateRepository } from './repository/create-repository';
import { getRepositoryInfo, RepositoryInfoInput } from './repository/info';
import { onUpdateDeleteRepository } from './repository/update-delete-repository';

// Dashboard users
import { getUserEvents, EventsInput } from './user/events';
import { getUserRepos, ReposInput } from './user/repos';
import { onUpdateUserStats } from './user/stats';

// Dashboard projects
import { onDeleteProjectRepositories } from './project/delete-project';
import { onUpdateProjectRepositories } from './project/update-repositories';

declare type HttpsFunction = functions.HttpsFunction;
declare type CloudFunction<T> = functions.CloudFunction<T>;
declare type Change<T> = functions.Change<T>;

export const findAllUserRepositories: HttpsFunction = functions.https.onCall((input: ReposInput, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
export const findAllUserEvents: HttpsFunction = functions.https.onCall((input: EventsInput, context: CallableContext) => getUserEvents(input.token, context.auth.uid, input.username));
export const findRepositoryInfo: HttpsFunction = functions.https.onCall((input: RepositoryInfoInput, context: CallableContext) => getRepositoryInfo(input.token, input.fullName));

export const deleteProjectRepositories: CloudFunction<DocumentSnapshot> = onDeleteProjectRepositories;
export const updateProjectRepositories: CloudFunction<DocumentSnapshot> = onUpdateProjectRepositories;
export const updateDeleteRepository: CloudFunction<Change<DocumentSnapshot>> = onUpdateDeleteRepository;
export const createRepository: CloudFunction<DocumentSnapshot> = onCreateRepository;
export const updateUserStats: CloudFunction<DocumentSnapshot> = onUpdateUserStats;
