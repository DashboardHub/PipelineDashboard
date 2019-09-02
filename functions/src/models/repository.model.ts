// Dashboard hub firebase functions models/mappers
import { DocumentData, DocumentReference, FirebaseAdmin, QuerySnapshot, WriteResult } from "../client/firebase-admin";

export interface IRepository {
  id: number;
  fullName: string;
  uid?: string;
}

export class RepositoryModel implements IRepository {
  id: number;
  fullName: string;
  uid?: string;

  public static getRepositoryReference(uid: string): DocumentReference {
    return FirebaseAdmin.firestore().collection('repositories').doc(uid);
  }

  public static async getRepositoryById(id: number): Promise<DocumentData | null> {
    const repositoriesSnapshot: QuerySnapshot = await FirebaseAdmin.firestore().collection('repositories').where('id', '==', id).limit(1).get();
    if (repositoriesSnapshot.empty) {
      return null;
    } else {
      return repositoriesSnapshot.docs.shift().data();
    }
  }

  public static async getRepositoryUidById(id: number): Promise<string | null> {
    const repositoriesSnapshot: QuerySnapshot = await FirebaseAdmin.firestore().collection('repositories').where('id', '==', id).limit(1).get();
    if (repositoriesSnapshot.empty) {
      return null;
    } else {
      return repositoriesSnapshot.docs.shift().id;
    }
  }

  public static async saveRepository(repository: DocumentData): Promise<WriteResult> {
    return await FirebaseAdmin
      .firestore()
      .collection('repositories')
      .doc(repository.uid)
      .set(repository, { merge: true });
  }

}