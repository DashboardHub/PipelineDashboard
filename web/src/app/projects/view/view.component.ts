// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// Thid party modules
import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

// DashboardHub
import { AuthenticationService, ProjectService } from '@core/services/index.service';
import { DialogListComponent } from '@shared/dialog/list/dialog-list.component';
import { ProjectModel, RepositoryModel } from '@shared/models/index.model';

/**
 * Project View component
 */
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

  /**
   * Life cycle method
   * @param route ActivatedRoute
   * @param router Router
   * @param dialog MatDialog
   * @param projectService ProjectService
   * @param authService AuthenticationService
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private meta: Meta
  ) {
    this.route.data.subscribe((data: { project: ProjectModel }) => this.project = data.project);
  }

  /**
   * Life cycle init method
   */
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

    this.updateMetaTags();
  }

  /**
   * Update meta tags for title and image for SEO
   */
  updateMetaTags(): void {
    this.meta.addTag({ property: 'og:title', content: this.project.title });
    this.meta.addTag({
      property: 'og:image', content: this.project.logoUrl
        ? this.project.logoUrl : 'https://cdn.dashboardhub.io/logo/favicon.ico',
    });
  }

  /**
   * Add the repository when click on add from repository dialog
   */
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

  /**
   * Show the delete confirmation dialog and delete the project
   */
  delete(): void {
    this.projectSubscription.unsubscribe();
    this.deleteSubscription = this.projectService
      .showDeleteDialog(this.project.uid)
      .subscribe(() => this.router.navigate(['/projects']));
  }

  /**
   * Check if logged in user is also owner of the project
   */
  public isAdmin(): boolean {
    return this.project.isAdmin(this.authService.profile.uid);
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
