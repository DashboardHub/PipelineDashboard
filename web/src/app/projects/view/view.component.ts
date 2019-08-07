import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

// DashboardHub
import { AuthenticationService, ProjectService } from '../../core/services/index.service';
import { DialogListComponent } from '../../shared/dialog/list/dialog-list.component';
import { IProject, ProjectModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-projects-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})

export class ViewProjectComponent implements OnInit, OnDestroy {
  private projectSubscription: Subscription;
  private deleteSubscription: Subscription;
  public project: IProject;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) {
    this.project = new ProjectModel({ uid: this.route.snapshot.paramMap.get('projectUid') });
  }

  ngOnInit(): void {
    this.projectSubscription = this.projectService
      .findOneById(this.route.snapshot.params.projectUid)
      .subscribe((project: IProject) => this.project = project);
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
        filter((selectedRepositories: { value: string }[]) => !!selectedRepositories),
        switchMap((selectedRepositories: { value: string }[]) => this.projectService.saveRepositories(
          this.project.uid,
          selectedRepositories.map((fullName: { value: string }) => fullName.value)
        ))
      )
      .subscribe(() => true);
  }

  // This function delete the project
  delete(): void {
    this.projectSubscription.unsubscribe();
    this.deleteSubscription = this.projectService
      .delete(this.project.uid)
      .subscribe(() => this.router.navigate(['/projects']));
  }

  // This function check if logged in user is also owner of the project
  isAdmin(): boolean {
    return this.projectService.isAdmin(this.project);
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
