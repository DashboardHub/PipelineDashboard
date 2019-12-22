// Dashboard hub firebase functions models/mappers
import { Firestore, Query, QueryDocumentSnapshot, QuerySnapshot, WriteBatch } from '../client/firebase-admin';

/**
 * From https://firebase.google.com/docs/firestore/manage-data/delete-data
 */
export function deleteCollection(db: Firestore, collectionPath: string, batchSize: number): Promise<any> {
  const query: Query = db.collection(collectionPath).limit(batchSize);

  return new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db: Firestore, query: Query, batchSize: number, resolve: (value?: any) => void, reject: (reason?: any) => void) {
  query.get()
    .then((snapshot: QuerySnapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      const batch: WriteBatch = db.batch();
      snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted: number) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    }).catch(reject);
}