import { DocumentData, DocumentReference, FirebaseAdmin } from './../client/firebase-admin';
import { GitHubClientDelete } from './../client/github';
import { Logger } from './../client/logger';

export interface DeleteGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onDeleteGitWebhookRepository: any = async (token: string, repositoryUid: string) => {
  try {
    const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid);
    const repository: DocumentData = (await repositorySnapshot.get()).data();

    if (repository.webhook) {
      await deleteWebhook(repository, token);
      repository.webhook = null;
      await repositorySnapshot.update(repository);
    }

    return repository;
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }
};


function deleteWebhook(repository: DocumentData, token: string): Promise<void> {
  return GitHubClientDelete<void>(`/repos/${repository.fullName}/hooks/${repository.webhook.id}`, token);
}
