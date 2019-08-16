// Angular modules
import { Injectable } from '@angular/core';

// Third party modules
import * as firebase from 'firebase';
import { throwError, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { ProjectModel, ProjectTokenModel } from '../../shared/models/index.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectTokenService {

  constructor(
    private projectService: ProjectService
  ) { }

  // This function returns the token details via id
  public findOneById(projectUid: string, tokenUid: string): Observable<ProjectTokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => data && data.tokens && data.tokens.find((item: ProjectTokenModel) => item.uid === tokenUid))
      );
  }

  // This function returns the tokens list
  public findAll(projectUid: string): Observable<ProjectTokenModel[]> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        map((data: ProjectModel) => Array.isArray(data.tokens) ? data.tokens : [])
      );
  }
  // This function returns the tokens via name
  public findProjectTokenByName(projectUid: string, name: string): Observable<ProjectTokenModel[]> {
    return this.findAll(projectUid)
      .pipe(
        map((tokens: ProjectTokenModel[]) => tokens.filter((item: ProjectTokenModel) => item.name === name))
      );
  }

  // This function create the project token
  public create(projectUid: string, data: ProjectTokenModel): Observable<ProjectTokenModel> {
    let token: ProjectTokenModel = {
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
  public save(projectUid: string, data: ProjectTokenModel): Observable<ProjectTokenModel> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          const found: ProjectTokenModel = Array.isArray(project.tokens) && project.tokens.find((item: ProjectTokenModel) => item.uid === data.uid);

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
  public delete(projectUid: string, tokenUid: string): Observable<ProjectTokenModel[]> {
    return this.projectService.findOneById(projectUid)
      .pipe(
        first(),
        switchMap((project: ProjectModel) => {
          const found: ProjectTokenModel = Array.isArray(project.tokens) && project.tokens.find((item: ProjectTokenModel) => item.uid === tokenUid);

          if (Array.isArray(project.tokens) && found) {
            project.tokens = project.tokens.filter((item: ProjectTokenModel) => item.uid !== tokenUid);
          } else {
            return throwError(new Error('Token not found.'));
          }

          return this.projectService.save(project)
            .pipe(
              map(() => project.tokens)
            );
        })
      );
  }

}
