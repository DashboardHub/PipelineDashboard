// Core modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Rxjs components
import { Subscription } from 'rxjs';

// Dashboard hub services and models
import { ProjectService } from '@core/services/index.service';
import { ProjectModel } from '@shared/models/index.model';

/**
 * Project create/edit component
 */
@Component({
  selector: 'dashboard-projects-create',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditProjectComponent implements OnInit, OnDestroy {

  private createEditSubscription: Subscription;
  private projectSubscription: Subscription;
  public uid: string;
  public isEdit: Boolean = false;
  public projectForm: FormGroup;

  /**
   * Life cycle method
   * @param router Router
   * @param form FormBuilder
   * @param snackBar MatSnackBar
   * @param projectService ProjectService
   * @param route ActivatedRoute
   */
  constructor(
    private router: Router,
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('projectUid');
    this.projectForm = this.form.group({
      type: ['public', [Validators.required]],
      title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      description: [undefined, [Validators.minLength(3), Validators.maxLength(1024)]],
      url: [undefined],
    });
    if (this.uid) {
      this.isEdit = true;
      this.projectSubscription = this.route.data
        .subscribe((data: { project: ProjectModel }) => this.projectForm.reset(data.project));
    }
  }

  /**
   * Save project details based upon if click on edit or add
   */
  save(): void {
    if (this.uid) {
      this.createEditSubscription = this.projectService
        .save({ uid: this.uid, ...this.projectForm.getRawValue() })
        .subscribe(
          () => this.router.navigate(['/projects', this.uid]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    } else {
      this.createEditSubscription = this.projectService
        .create(this.projectForm.getRawValue())
        .subscribe(
          (project: ProjectModel) => this.router.navigate(['/projects', project.uid]),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    if (this.createEditSubscription) {
      this.createEditSubscription.unsubscribe();
    }
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
