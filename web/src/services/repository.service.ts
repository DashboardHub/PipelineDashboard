import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RepositoryModel, ProfileModel } from '../models/index.model';
import { from, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { concatMap, map, switchMap, mergeMap, toArray } from 'rxjs/operators';
import { GitHubRepositoryService } from './github/index.services';
import { RepositoriesModel } from '../models/index.model';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    private profile: ProfileModel;

    constructor(
        private afs: AngularFirestore,
        private authService: AuthenticationService,
        private githubRepositoryService: GitHubRepositoryService,
    ) {
        this.authService.checkAuth().subscribe((profile: ProfileModel) => this.profile = profile);
    }

    public findAll(force: boolean = false): Observable<RepositoriesModel> {
        if ((!this.authService.profile.repositories || this.authService.profile.repositories.data.length === 0) || force) {
            return this.reload()
                .pipe(
                    concatMap(() => of(this.authService.profile.repositories))
                );
        }

        return of(this.authService.profile.repositories);
    }

    private reload(): Observable<RepositoryModel[]> {
        return this.githubRepositoryService
            .findAll()
            .pipe(
                concatMap(
                    (repositories: RepositoryModel[]) => from(this.afs.collection<ProfileModel>('users')
                                                            .doc<ProfileModel>(this.profile.uid)
                                                            .update({
                                                                repositories: {
                                                                    lastUpdated: new Date(),
                                                                    data: repositories
                                                                        .map((repository: RepositoryModel) => ({
                                                                            uid: new RepositoryModel(repository.fullName).uid,
                                                                            fullName: repository.fullName,
                                                                            description: repository.description,
                                                                            private: repository.private,
                                                                            })),
                                                                }
                                                            })),
                    ((repositories: RepositoryModel[]) => repositories)
                ),
                concatMap(
                    (repositories: RepositoryModel[]) => repositories
                                                            .map((repository: RepositoryModel) => from(
                                                                this.afs.collection<RepositoryModel>('repositories')
                                                                .doc<RepositoryModel>(new RepositoryModel(repository.fullName).uid)
                                                                .set({ ownerId: this.profile.uid, ...repository }, { merge: true }))
                                                            ),
                    ((repositories: RepositoryModel[]) => repositories)
                ),
            );
    }
}
