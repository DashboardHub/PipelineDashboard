import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { getRepositoryInfo, RepositoryInfoInput } from './repository/info';

import { getUserEvents, EventsInput } from './user/events';
import { getUserRepos, ReposInput } from './user/repos';

import { onDeleteProjectRepositories } from './project/delete-project';
import { onUpdateProjectRepositories } from './project/update-repositories';
import { onCreateRepository } from './repository/create-repository';
import { onUpdateDeleteRepository } from './repository/update-delete-repository';


declare type HttpsFunction = functions.HttpsFunction;

export * from './user/stats';

export const findAllUserRepositories: HttpsFunction = functions.https.onCall((input: ReposInput, context: CallableContext) => getUserRepos(input.token, context.auth.uid));
export const findAllUserEvents: HttpsFunction = functions.https.onCall((input: EventsInput, context: CallableContext) => getUserEvents(input.token, context.auth.uid, input.username));
export const findRepositoryInfo: HttpsFunction = functions.https.onCall((input: RepositoryInfoInput, context: CallableContext) => getRepositoryInfo(input.token, input.fullName));

export const deleteProjectRepositories: any = onDeleteProjectRepositories;
export const updateProjectRepositories: any = onUpdateProjectRepositories;
export const updateDeleteRepository: any = onUpdateDeleteRepository;
export const createRepository: any = onCreateRepository;
