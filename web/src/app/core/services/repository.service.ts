import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoriesModel, RepositoryModel } from '../../shared/models/index.model';
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
  public refresh(): Observable<RepositoriesModel> {
    const callable: any = this.fns.httpsCallable('findAllUserRepositories');
    return callable({ token: this.authService.profile.oauth.githubToken });
  }

  // This function returns the repository via uid
  public findOneById(uid: string): Observable<RepositoryModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<RepositoryModel>('repositories').doc<RepositoryModel>(uid).valueChanges())
      );
  }

  // This function loads all the available repositories
  public loadRepository(fullName: string): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('findRepositoryInfo');
    return callable({ fullName, token: this.authService.profile.oauth.githubToken });
  }

  public createGitWebhook(repo: RepositoryModel): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('createGitWebhookRepository');
    return callable({ repositoryUid: repo.uid, token: this.authService.profile.oauth.githubToken });
  }

  public deleteGitWebhook(repositoryUid: string): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('deleteGitWebhookRepository');
    return callable({ repositoryUid, token: this.authService.profile.oauth.githubToken });
  }
}
