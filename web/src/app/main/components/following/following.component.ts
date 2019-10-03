// Core modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// DashboardHub Service and models
import { ProjectService } from '@app/core/services/index.service';
import { ProfileModel, ProjectModel } from '@app/shared/models/index.model';
import { forkJoin } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'dashboard-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {

  public profile: ProfileModel = new ProfileModel();
  public projects: ProjectModel[] = [];
  public title: string = 'Following projects list';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.data
    //   .subscribe((profile: ProfileModel) => {
    //     this.profile = profile[0];
    //     if (this.profile.following && this.profile.following.length > 0) {
    //       this.profile.following.forEach((item: string) => {
    //         this.projectService.findOneById(item).subscribe((result: ProjectModel) => {
    //           this.projects.push(result);
    //           // this.projects = this.projects.slice();
    //         });
    //       });
    //     }
    //   });
    
    this.route.data
      .pipe(
        map((profile: ProfileModel[]) => this.profile = profile[0]),
        tap(() => console.log('----- profile ----', this.profile)), // @TODO: why an array
        filter((profile: ProfileModel) => this.profile.following && this.profile.following.length > 0  ? true : false),
        tap(() => console.log('----- HERE 3 ----' , this.profile.following)),
        mergeMap((profile: ProfileModel) => {
          console.log(profile);
          return forkJoin(...this.profile.following.map((uid: string) => {
            console.log(uid);
  
            return this.projectService.findOneById(uid).pipe( tap((result: ProjectModel) => console.log(result)));
          }));
        }),
        tap(() => console.log('----- HERE 4 ----')),
        tap((projects: ProjectModel[]) => console.log('projects', projects))
      )
      .subscribe((projects: ProjectModel[]) => {
        this.projects = projects;
        console.log(this.projects);
      });
  }

}
