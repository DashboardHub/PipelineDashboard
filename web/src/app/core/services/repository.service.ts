import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { RepositoryModel, ProfileModel } from '../../../models/index.model';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { pluck } from 'rxjs/operators';
import { RepositoriesModel } from '../../../models/index.model';

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
            const callable: any = this.fns.httpsCallable('findAllUserRepositories');
            callable({ token: this.authService.profile.oauth.githubToken });
        }

        return this.authService
                .getProfile(this.authService.profile.uid)
                .pipe(
                    pluck('repositories')
                );
    }

    public findOneById(uid: string): Observable<RepositoryModel> {
        return from(this.afs.collection<RepositoryModel>('repositories').doc<RepositoryModel>(uid).valueChanges());
    }

    public loadRepository(fullName: string): void {
        const callable: any = this.fns.httpsCallable('getRepositoryInfo');
        callable({ fullName, token: this.authService.profile.oauth.githubToken });
    }
}
