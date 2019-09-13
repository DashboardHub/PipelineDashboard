import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard hub model and services
import { RepositoriesModel, RepositoryModel } from '@shared/models/index.model';
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
  public loadRepository(repo: RepositoryModel): Observable<boolean> {
    const callable: any = this.fns.httpsCallable('findRepositoryInfo');
    return callable({ repository: repo, token: this.authService.profile.oauth.githubToken });
  }

  public createGitWebhook(repo: RepositoryModel): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('createGitWebhookRepository');

    return callable({ repositoryUid: repo.uid, token: this.authService.profile.oauth.githubToken });
  }

  public deleteGitWebhook(repo: { uid?: string, id?: number }): Observable<RepositoryModel> {
    const callable: any = this.fns.httpsCallable('deleteGitWebhookRepository');
    return callable({ data: { uid: repo.uid, id: repo.id }, token: this.authService.profile.oauth.githubToken });
  }

  public getRating(repo: RepositoryModel): number {
    const checks: number[] = [];

    checks.push(repo.issues.length > 0 ? this.getPoints(repo.issues[0].createdOn.toDate()) : 0);
    checks.push(repo.releases.length > 0 ? this.getPoints(repo.releases[0].createdOn.toDate()) : 0);
    checks.push(repo.milestones.length > 0 ? this.getPoints(new Date(repo.milestones[0].updatedAt)) : 0);
    checks.push(repo.url ? 100 : 0);
    checks.push(repo.description ? 100 : 0);
    checks.push(repo.forksCount ? this.getPointsByCount(repo.forksCount, 50) : 0);
    checks.push(repo.stargazersCount ? this.getPointsByCount(repo.stargazersCount, 100) : 0);
    checks.push(repo.watchersCount ? this.getPointsByCount(repo.watchersCount, 25) : 0);

    return checks.reduce((total: number, current: number) => total + current, 0) / checks.length;
  }

  public getPoints(date: Date): number {
    const boundary: number = 30; // days
    const currentDate: Date = new Date();
    const referenceDate: Date = new Date(date);
    let lapse: number = Math.floor((currentDate.getTime() - referenceDate.getTime()) / 1000);
    const hoursInDay: number = 24 * 60 * 60;
    const duration: number = Math.ceil(lapse / hoursInDay);

    if (duration > boundary) {
      return 0;
    }

    return ((boundary - duration) / 30) * 100; // percentage
  }

  public getPointsByCount(count: number, limit: number): number {
    let points: number;
    switch (true) {
      case (count >= 1 && count <= limit):
        points = 50;
        break;
      case (count > limit):
        points = 100;
        break;
      default:
        points = 0;
    }

    return points;
  }
}
