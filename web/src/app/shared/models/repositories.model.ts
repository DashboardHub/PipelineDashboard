import { firestore } from 'firebase';

import { RepositoryModel } from './repository.model';

export class RepositoriesModel {
  lastUpdated: firestore.Timestamp;
  data: RepositoryModel[] = [];
}
