import { DocumentData, FirebaseAdmin, QueryDocumentSnapshot } from '../../../client/firebase-admin';
import { RepositoryModel } from '../../../models/index.model';
import { isExistProperties, Repository, User } from './shared';

type Action = 'created' | 'deleted' | 'archived' | 'unarchived' | 'edited' | 'renamed' | 'transferred' | 'publicized' | 'privatized';

export interface RepositoryEventInput {
  action: Action;
  changes?: {
    repository: {
      name: { from: string }
    }
  };
  repository: Repository;
  sender: User;
}

export class RepositoryEventModel implements RepositoryEventInput {
  action: Action;
  changes?: {
    repository: {
      name: { from: string }
    }
  };
  repository: Repository;
  sender: User;

  constructor(input: RepositoryEventInput) {
    Object.assign(this, input);
  }

  public static isCurrentModel(input: any): boolean {
    const requireKeys: string[] = ['action', 'repository', 'sender'];
    const objKeys: string[] = Object.keys(input);
    let length: number = requireKeys.length;

    if (objKeys.find((elem: string) => elem === 'changes')) {
      ++length;
    }

    return objKeys.length === length && isExistProperties(input, requireKeys);
  }

  public async updateData(): Promise<void> {

    switch (this.action) {
      case 'edited': {
        break;
      }
      case 'renamed': {
        await this.renameAction();
        break;
      }
      case 'transferred': {
        break;
      }
      case 'publicized': {
        break;
      }
      case 'privatized': {
        break;
      }
    }


  }

  private async renameAction(){

    const repository: DocumentData = await RepositoryModel.getRepositoryById(this.repository.id);
    // const projects: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('projects').where('repositories', 'array-contains', repository.uid).get()).docs;
    
    const users: QueryDocumentSnapshot[] = (await FirebaseAdmin.firestore().collection('users').get()).docs;

    // TODO rename in project
    // for(const project of projects) {
    //   project.data();
    // };

    // TODO rename in user
    for(const user of users) {
      user.data();
    };

    await RepositoryModel.saveRepository(repository);

  }


}
