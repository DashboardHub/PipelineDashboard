import { DocumentData, DocumentReference, FirebaseAdmin, WriteResult } from "../client/firebase-admin";
import { GitHubRepositoryMapper } from "../mappers/github/index.mapper";

export class RepositoryModel{

  public static async getRepositoryByFullName(fullName: string): Promise<DocumentData> {
    const repositorySnapshot: DocumentReference = FirebaseAdmin.firestore().collection('repositories').doc(GitHubRepositoryMapper.fullNameToUid(fullName));
    return (await repositorySnapshot.get()).data();
  }
  
  public static async saveRepository(repository: DocumentData): Promise<WriteResult> {
    return await FirebaseAdmin
      .firestore()
      .collection('repositories')
      .doc(repository.uid)
      .set(repository, { merge: true });
  }

}