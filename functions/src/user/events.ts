import { DocumentReference, FirebaseAdmin, WriteBatch } from './../client/firebase-admin';

import { GitHubEventInput, GitHubEventMapper, GitHubEventModel } from '../mappers/github/index.mapper';
import { GitHubClient } from './../client/github';
import { Logger } from './../client/logger';

export interface EventsInput {
  token: string;
  username: string;
}

export const getUserEvents: any = async (token: string, uid: string, username: string) => {
  const batch: WriteBatch = FirebaseAdmin.firestore().batch();
  const userRef: DocumentReference = FirebaseAdmin.firestore().collection('users').doc(uid);
  let events: GitHubEventInput[] = [];
  try {
    events = await GitHubClient<GitHubEventInput[]>(`/users/${username}/events`, token);
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
  const mappedEvents: GitHubEventModel[] = events.map((event: GitHubEventInput) => GitHubEventMapper.import(event));

  await batch
    .update(userRef, {
      activity: mappedEvents,
    });

  await batch.commit();

  return mappedEvents;
};
