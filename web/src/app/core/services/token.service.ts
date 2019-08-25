// Angular modules
import { Injectable } from '@angular/core';

// Third party modules
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { throwError, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { first, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { ModelFactory } from '@shared/models/factories/model.factory';
import { IProject, IToken, ProjectModel, TokenModel } from '@shared/models/index.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(
    private afs: AngularFirestore,
    private projectService: ProjectService
  ) { }

  // This function returns the token details via id
  public findOneById(projectUid: string, tokenUid: string): Observable<TokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => data && data.tokens && data.tokens.find((item: TokenModel) => item.uid === tokenUid))
      );
  }

  // This function returns the tokens list
  public findAll(projectUid: string): Observable<TokenModel[]> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => Array.isArray(data.tokens) ? data.tokens : [])
      );
  }

  // This function create the project token
  public save(projectUid: string, token: TokenModel): Observable<void> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        take(1),
        map((project: ProjectModel) => {
          const tokens: TokenModel[] = project.tokens;

          if (tokens.find((tokenModel: TokenModel) => tokenModel.uid === token.uid)) {
            return project.tokens.map((tokenModel: TokenModel) => {
              if (tokenModel.uid === token.uid) {
                return new TokenModel({ ...tokenModel.toData(), ...token.toData(true) });
              }

              return tokenModel;
            });
          }

          token.uid = uuid();
          token.createdOn = firebase.firestore.Timestamp.fromDate(new Date());
          token.updatedOn = firebase.firestore.Timestamp.fromDate(new Date());

          return project.tokens.concat(token);
        }),
        switchMap((tokens: TokenModel[]) => this.afs
          .collection<IProject>('projects')
          .doc<IProject>(projectUid)
          .set(
            {
              tokens: ModelFactory.fromModels<TokenModel, IToken>(tokens),
              updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            { merge: true }))
      );
  }

  // This function delete the token via uid
  public delete(projectUid: string, tokenUid: string): Observable<TokenModel[]> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          const found: TokenModel = Array.isArray(project.tokens) && project.tokens.find((item: TokenModel) => item.uid === tokenUid);

          if (Array.isArray(project.tokens) && found) {
            project.tokens = project.tokens.filter((item: TokenModel) => item.uid !== tokenUid);
          } else {
            return throwError(new Error('Token not found.'));
          }

          return this.projectService.save(project.toData())
            .pipe(
              map(() => project.tokens)
            );
        })
      );
  }

}
