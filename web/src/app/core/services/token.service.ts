import { Injectable } from '@angular/core';

// Third party modules
import * as firebase from 'firebase';
import { throwError, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { IProjectTokenModel, ProjectModel } from '../../shared/models/index.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(
    private projectService: ProjectService
  ) { }

  // This function returns the token details via id
  public findOneById(projectUid: string, tokenUid: string): Observable<IProjectTokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => data && data.tokens && data.tokens.find((item: IProjectTokenModel) => item.uid === tokenUid))
      );
  }

  // This function returns the tokens list
  public findAll(projectUid: string): Observable<IProjectTokenModel[]> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => Array.isArray(data.tokens) ? data.tokens : [])
      );
  }
  // This function returns the tokens via name
  public findProjectTokenByName(projectUid: string, name: string): Observable<IProjectTokenModel[]> {
    return this.findAll(projectUid)
      .pipe(
        map((tokens: IProjectTokenModel[]) => tokens.filter((item: IProjectTokenModel) => item.name === name))
      );
  }

  // This function create the project token
  public create(projectUid: string, data: IProjectTokenModel): Observable<IProjectTokenModel> {
    let token: IProjectTokenModel = {
      uid: uuid(),
      ...data,
      createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          if (Array.isArray(project.tokens)) {
            project.tokens.push(token);
          } else {
            project.tokens = [token];
          }
          return this.projectService.save(project);
        }),
        map(() => token)
      );
  }

  // This function update the token details
  public save(projectUid: string, data: IProjectTokenModel): Observable<IProjectTokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          const found: IProjectTokenModel = Array.isArray(project.tokens) && project.tokens.find((item: IProjectTokenModel) => item.uid === data.uid);

          if (found) {
            Object.assign(found, data);
            found.updatedOn = firebase.firestore.Timestamp.fromDate(new Date());
          } else {
            return throwError(new Error('Token not found.'));
          }

          return this.projectService.save(project).pipe(map(() => found));
        })
      );
  }

  // This function delete the token via uid
  public delete(projectUid: string, tokenUid: string): Observable<IProjectTokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          const found: IProjectTokenModel = Array.isArray(project.tokens) && project.tokens.find((item: IProjectTokenModel) => item.uid === tokenUid);

          if (Array.isArray(project.tokens) && found) {
            project.tokens = project.tokens.filter((item: IProjectTokenModel) => item.uid !== tokenUid);
          } else {
            return throwError(new Error('Token not found.'));
          }

          return this.projectService.save(project).pipe(
            map(() => found)
          );
        })
      );
  }

}
