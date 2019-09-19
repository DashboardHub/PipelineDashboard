// Firestore module
import { firestore } from 'firebase';

// Application model
import { RepositoryModel } from './repository.model';

/**
 * Repository model
 */
export class RepositoriesModel {
  lastUpdated: firestore.Timestamp;
  data: RepositoryModel[] = [];
}
