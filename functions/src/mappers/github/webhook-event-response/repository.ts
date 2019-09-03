import { CollectionReference, DocumentData, FirebaseAdmin, QueryDocumentSnapshot, QuerySnapshot, Transaction } from '../../../client/firebase-admin';
import { RepositoryModel } from '../../../models/index.model';
import { GitHubRepositoryMapper, GitHubRepositoryModel } from '../repository.mapper';
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
        await this.edited();
        break;
      }
      case 'renamed': {
        await this.renamed();
        break;
      }
      case 'transferred': {
        await this.transferred();
        break;
      }
      case 'publicized': {
        await this.publicized();
        break;
      }
      case 'privatized': {
        await this.privatized();
        break;
      }
    }


  }

  private async edited(): Promise<void> {
    const repository: DocumentData = await RepositoryModel.getRepositoryById(this.repository.id);

    // update repo in users
    const usersRef: CollectionReference = FirebaseAdmin.firestore().collection('users');
    const newMinDataRepo: GitHubRepositoryModel = GitHubRepositoryMapper.import(this.repository);

    await FirebaseAdmin.firestore().runTransaction((t: Transaction) => {
      return t.get(usersRef)
        .then((snap: QuerySnapshot) => {
          snap.forEach((element: QueryDocumentSnapshot) => {
            const userData: DocumentData = element.data;

            if (userData.repositories && Array.isArray(userData.repositories.data) && userData.repositories.data.length > 0) {
              const repos: GitHubRepositoryModel[] = userData.repositories.data;
              const foundIndex: number = repos.findIndex((item: GitHubRepositoryModel) => item.uid && item.uid === repository.uid)

              if (foundIndex > -1) {
                Object.assign(repos[foundIndex], newMinDataRepo);
                t.update(element.ref, { repositories: { ...userData.repositories, data: repos } });
              }
            }
          });

        });
    });

    const newDataRepo: GitHubRepositoryModel = GitHubRepositoryMapper.import(this.repository, 'all');
    Object.assign(repository, newDataRepo);
    await RepositoryModel.saveRepository(repository);
  }

  private async renamed(): Promise<void> {
    await this.edited();
  }

  private async transferred(): Promise<void> {
    await this.edited();
  }

  private async publicized(): Promise<void> {
    await this.edited();
  }

  private async privatized(): Promise<void> {
    await this.edited();
  }

}
