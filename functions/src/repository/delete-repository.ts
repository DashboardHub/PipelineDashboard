// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { DocumentSnapshot } from './../client/firebase-admin';
import { deleteRepoBuilds } from './pull-request';

export const onDeleteRepository: CloudFunction<DocumentSnapshot> = firestore
.document('repositories/{repositoryUid}')
.onDelete(async (repositorySnapshot: DocumentSnapshot, context: EventContext) => {
  await deleteRepoBuilds(context.params.repositoryUid);
});
