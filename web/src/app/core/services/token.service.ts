import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { from, of, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { TokenModel, RepositoryModel } from '../../shared/models/index.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService
  ) {
  }

  // This function is for creating the token for logged in user
  public create(data: TokenModel): Observable<TokenModel> {
    let token: TokenModel = {
      uid: uuid(),
      ...data,
      updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    return from(
      this.afs.collection<TokenModel>('tokens')
        .doc(token.uid)
        .set(token)
    )
      .pipe(
        () => of(token)
      );
  }

  // This function delete the token via uid
  public delete(uid: string): Observable<void> {
    return from(
      this.afs
        .collection<TokenModel>('tokens')
        .doc<TokenModel>(uid)
        .delete()
    );
  }

  // This function returns the public tokens list
  public findPublicTokens(): Observable<TokenModel[]> {
    return from(this.afs
      .collection<TokenModel>(
        'tokens',
        (ref: firebase.firestore.Query) => ref.where('type', '==', 'public')
          .orderBy('updatedOn', 'desc')
      )
      .valueChanges()
    );
  }

  // This function returns the private tokens list
  public findMyTokens(): Observable<TokenModel[]> {
    return from(this.afs
      .collection<TokenModel>(
        'tokens',
        (ref: firebase.firestore.Query) => ref.where('access.admin', 'array-contains', this.authService.profile.uid)
          .orderBy('updatedOn', 'desc')
      )
      .valueChanges()
    );
  }

  // This function returns the token details via id
  public findOneById(uid: string): Observable<TokenModel> {
    return from(this.afs.collection<TokenModel>('tokens').doc<TokenModel>(uid).valueChanges());
  }
  
  // This function returns the token details via id
  public findOneByProjectId(uid: string): Observable<TokenModel[]> {
    return from(this.afs
      .collection<TokenModel>(
        'tokens',
        (ref: firebase.firestore.Query) => ref.where('projectuid', '==', uid)
          .orderBy('updatedOn', 'desc')
      )
      .valueChanges()
    );
  }

  // This function update the token details
  public save(token: TokenModel): Observable<void> {
    return from(
      this.afs
        .collection<TokenModel>('tokens')
        .doc<TokenModel>(token.uid)
        .set({ ...token, updatedOn: firebase.firestore.Timestamp.fromDate(new Date()) }, { merge: true })
    );
  }

 
}
