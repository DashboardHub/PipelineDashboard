import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Dashboard hub model and services
import { IRepository, RepositoryModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private authService: AuthenticationService,
    private activityService: ActivityService
  ) { }

  // Forces refresh of users repositories
  public refresh(): Observable<IRepository> {
    const callable: any = this.fns.httpsCallable('findAllUserRepositories');

    return callable({ token: this.authService.profile.oauth.githubToken });
  }

  // This function returns the repository via uid
  public findOneById(uid: string): Observable<RepositoryModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IRepository>(
          'repositories',
          (ref: firebase.firestore.Query) => ref
            .orderBy('updatedOn', 'desc')
        ).doc<IRepository>(uid).valueChanges()),
        map((repository: IRepository) => new RepositoryModel(repository))
      );
  }

  // This function loads all the available repositories
  public loadRepository(repo: IRepository): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('findRepositoryInfo');

    return callable({ repository: repo, token: this.authService.profile.oauth.githubToken });
  }

  public createGitWebhook(repo: IRepository): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('createGitWebhookRepository');

    return of(new RepositoryModel(callable({ repositoryUid: repo.uid, token: this.authService.profile.oauth.githubToken })));
  }

  public deleteGitWebhook(repo: { uid?: string, id?: number }): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('deleteGitWebhookRepository');

    return of(new RepositoryModel(callable({ data: { uid: repo.uid, id: repo.id }, token: this.authService.profile.oauth.githubToken })));
  }
}
