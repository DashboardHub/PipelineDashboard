import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

// Thid party modules
import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

// DashboardHub
import { AuthenticationService, ProjectService } from '@core/services/index.service';
import { DialogListComponent } from '@shared/dialog/list/dialog-list.component';
import { ProjectModel, RepositoryModel } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-projects-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})

export class ViewProjectComponent implements OnInit, OnDestroy {

  private deleteSubscription: Subscription;
  private projectSubscription: Subscription;
  public typeIcon: string;
  public project: ProjectModel;
  public isMenuOpen: boolean;
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) {
    this.route.data.subscribe((data: { project: ProjectModel }) => this.project = data.project);
  }

  ngOnInit(): void {
    this.projectSubscription = this.projectService
      .findOneById(this.route.snapshot.params.projectUid)
      .subscribe((project: ProjectModel) => {
        this.project = project;
        if (!this.project.logoUrl) {
          this.project.logoUrl = 'https://cdn.dashboardhub.io/logo/favicon.ico';
        }
        if (this.project.type === 'private') {
          this.typeIcon = 'private_icon';
        } else if (this.project.type === 'public') {
          this.typeIcon = 'public_icon';
        }
      }
      );
  }

  // This function add  the repository
  addRepository(): void {
    this.dialog
      .open(DialogListComponent, {
        data: {
          project: this.project,
          repositories: this.authService.profile.repositories,
        },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((selectedRepositories: { value: RepositoryModel }[]) => !!selectedRepositories),
        switchMap((selectedRepositories: { value: RepositoryModel }[]) => this.projectService.saveRepositories(
          this.project,
          selectedRepositories.map((item: { value: RepositoryModel }) => item.value).filter((value: RepositoryModel) => value.uid)
        ))
      )
      .subscribe();
  }

  delete(): void {
    this.projectService.showDeleteDialog(this.project.uid);
  }

  // This function check if logged in user is also owner of the project
  isAdmin(): boolean {
    return this.project.isAdmin(this.authService.profile.uid);
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
