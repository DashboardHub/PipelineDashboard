// Core modules
import { Component, OnInit } from '@angular/core';

// DashboardHub Service and models
import { ProfileModel, ProjectModel } from '@app/shared/models/index.model';
import { AuthenticationService, ProjectService } from '@core/services/index.service';
import { combineLatest, of } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'dashboard-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {

  public projects: ProjectModel[] = [];
  public title: string = 'Following projects list';

  constructor(
    private authenticationService: AuthenticationService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    of(this.authenticationService.profile)
      .pipe(
        filter((profile: ProfileModel) => !!(profile.following && profile.following.length)),
        mergeMap((profile: ProfileModel) => combineLatest(...profile.following.map((uid: string) => this.projectService.findOneById(uid))))
      )
      .subscribe((projects: ProjectModel[]) => this.projects = projects);
  }

}
