// Core modules
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Dashboard hub model and services
import { IRepository, RepositoryModel } from '@shared/models/index.model';
import { ActivityService } from './activity.service';
import { AuthenticationService } from './authentication.service';

/**
 * Repository service
 */
@Injectable({
  providedIn: 'root',
})
export class RepositoryService {

  /**
   * Life cycle method
   * @param afs Angularfirestore
   * @param fns AngularFirefunctions
   * @param authService AuthService
   * @param activityService ActivityService
   */
  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private authService: AuthenticationService,
    private activityService: ActivityService
  ) { }

  /**
   * Forces refresh of users repositories
   * @returns Observable
   */
  public refresh(): Observable<IRepository> {
    const callable: any = this.fns.httpsCallable('findAllUserRepositories');

    return callable({ token: this.authService.profile.oauth.githubToken });
  }

  /**
   * Find the repository via uid
   * @param uid uid of repository
   */
  public findOneById(uid: string): Observable<RepositoryModel> {
    return this.activityService
      .start()
      .pipe(
        switchMap(() => this.afs.collection<IRepository>('repositories').doc<IRepository>(uid).valueChanges()),
        map((repository: IRepository) => new RepositoryModel(repository))
      );
  }

  /**
   * Loads all the available repositories
   * @returns Observable
   */
  public loadRepository(repo: IRepository): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('findRepositoryInfo');

    return callable({ repository: repo, token: this.authService.profile.oauth.githubToken });
  }

  /**
   * Call cloud function create webhook manually
   * @param repo repository
   * @returns Observable
   */
  public createGitWebhook(repo: IRepository): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('createGitWebhookRepository');

    return of(new RepositoryModel(callable({ repositoryUid: repo.uid, token: this.authService.profile.oauth.githubToken })));
  }

  /**
   * Call cloud function to delete webhook manually
   * @param repo repository
   */
  public deleteGitWebhook(repo: { uid?: string, id?: number }): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('deleteGitWebhookRepository');

    return of(new RepositoryModel(callable({ data: { uid: repo.uid, id: repo.id }, token: this.authService.profile.oauth.githubToken })));
  }
}
