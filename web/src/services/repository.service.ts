import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { RepositoryModel, ProfileModel } from '../models/index.model';
import { from, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { concatMap } from 'rxjs/operators';
import { RepositoriesModel } from '../models/index.model';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    private profile: ProfileModel;

    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions,
        private authService: AuthenticationService,
    ) {
        this.authService.checkAuth().subscribe((profile: ProfileModel) => this.profile = profile);
    }

    public findAll(force: boolean = false): Observable<RepositoriesModel> {
        if (force) {
            const callable = this.fns.httpsCallable('findAllUserRepositories');
            callable({ token: this.authService.profile.oauth.githubToken })
                .pipe(
                    concatMap(() => of(this.authService.profile.repositories))
                );
        }

        return of(this.authService.profile.repositories);
    }

    public findOneById(uid: string): Observable<RepositoryModel> {
        return from(this.afs.collection<RepositoryModel>('repositories').doc<RepositoryModel>(uid).valueChanges());
    }

    public loadRepository(fullName: string): void {
        const callable = this.fns.httpsCallable('getRepositoryInfo');
        callable({ fullName, token: this.authService.profile.oauth.githubToken });
    }
}
