import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Dashboard hub model and services
import { RatingModel, RepositoriesModel, RepositoryModel } from '@shared/models/index.model';
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

  public getRating(repo: RepositoryModel): RatingModel[] {
    const checks: RatingModel[] = [];

    checks.push({
      name: 'Issues',
      description: 'Keep issues up to date',
      value: repo.issues.length > 0 ? this.getPoints(repo.issues[0].createdOn.toDate()) : 0
    });
    checks.push({
      name: 'Releases',
      description: 'Mark key stages in your project with releases',
      value: repo.releases.length > 0 ? this.getPoints(repo.releases[0].createdOn.toDate()) : 0
    });
    checks.push({
      name: 'Milestones',
      description: 'Organise issues into milestones',
      value: repo.milestones.length > 0 ? this.getPoints(repo.milestones[0].updatedAt.toDate()) : 0
    });
    checks.push({
      name: 'Url',
      description: 'Repository url is great way for people to easily find more information',
      value: repo.url ? 100 : 0
    });
    checks.push({
      name: 'Description',
      description: 'Repository',
      value: repo.description ? 100 : 0
    });
    checks.push({
      name: 'Forks',
      description: 'Encourage others to contribute to your repository and build your community',
      value: repo.forksCount ? this.getPointsByCount(repo.forksCount, 50) : 0
    });
    checks.push({
      name: 'Stars',
      description: 'Encourage others to favourite your repository to watch the activity in their timeline',
      value: repo.stargazersCount ? this.getPointsByCount(repo.stargazersCount, 100) : 0
    });
    checks.push({
      name: 'Watchers',
      description: 'Encourage others to watch your repository to get notified of events',
      value: repo.watchersCount ? this.getPointsByCount(repo.watchersCount, 25) : 0
    });

    return checks.sort((a, b) => b.value - a.value);
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
