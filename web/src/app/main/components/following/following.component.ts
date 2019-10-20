// Core modules
import { Component, OnInit } from '@angular/core';

// Rxjs modules
import { combineLatest } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

// DashboardHub Service and models
import { AuthenticationService, ProjectService } from '@core/services/index.service';
import { ProfileModel, ProjectModel } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {

  public projects: ProjectModel[] = [];
  public title: string = 'Following projects list';

  /**
   * Life cycle method
   * @param authenticationService AuthenticationService
   * @param projectService ProjectService
   */
  constructor(
    private authenticationService: AuthenticationService,
    private projectService: ProjectService
  ) { }

  /**
   * Finds the all projects details followed by logged in user
   */
  ngOnInit(): void {
    this.authenticationService.getCurrentUser()
      .pipe(
        filter((profile: ProfileModel) => !!(profile.following && profile.following.length)),
        mergeMap((profile: ProfileModel) => combineLatest(...profile.following.map((uid: string) => this.projectService.findOneById(uid))))
      )
      .subscribe((projects: ProjectModel[]) => this.projects = projects);
  }
}
