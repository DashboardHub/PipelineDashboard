// Angular modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Third party modules
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// Dashboard model and services
import { TokenService } from '@core/services/index.service';
import { BreadCrumbModel, ProjectModel, TokenModel } from '@shared/models/index.model';

/**
 * token create/edit component
 */
@Component({
  selector: 'dashboard-project-tokens-create-edit',
  templateUrl: './tokens-create-edit.component.html',
  styleUrls: ['./tokens-create-edit.component.scss'],
})
export class TokensCreateEditComponent implements OnInit, OnDestroy {

  private projectSubscription: Subscription;
  private tokenSubscription: Subscription;
  private viewProjectSubscription: Subscription;
  private uid: string;

  public isEdit: Boolean = false;
  public projectUid: string;
  public tokenForm: FormGroup;
  public project: ProjectModel;
  public breadCrumb: BreadCrumbModel[];

  /**
   * Life cycle method
   * @param form FormBuilder
   * @param tokenService TokenService
   * @param route ActivatedRoute
   * @param router Router
   * @param snackBar MatSnackBar
   */
  constructor(
    private form: FormBuilder,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.tokenForm = this.form.group({
      uid: uuid(),
      name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)], [this.validateTokenNotTaken.bind(this)]],
    });
    if (this.uid) {
      this.isEdit = true;
      this.projectSubscription = this.route.data
        .subscribe((data: { token: TokenModel }) => this.tokenForm.reset(data.token));
    }
    this.viewProjectSubscription = this.route.data
      .subscribe((data: { project: ProjectModel }) => {
        this.project = data.project;
        this.breadCrumb = [{ link: `/projects/${this.project.uid}`, title: this.project.title }];
      });
  }

  /**
   * Life cycle destroy method
   */
  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
      this.viewProjectSubscription.unsubscribe();
    }
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  /**
   * Create project token and edit
   * project token details based upon if click on edit or add
   */
  save(): void {
    this.tokenSubscription = this.tokenService
      .save(this.projectUid, new TokenModel({ ...this.tokenForm.value }))
      .subscribe(
        () => this.router.navigate(['/projects', this.projectUid, 'tokens']),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }

  /**
   * Check the project token on uniqueness
   * @param control AbstractControl
   */
  private validateTokenNotTaken(control: AbstractControl): Observable<any> {
    return this.tokenService
      .findAll(this.projectUid)
      .pipe(
        map((tokens: TokenModel[]) => tokens.filter((token: TokenModel) => token === control.value)),
        map((tokens: TokenModel[]) => tokens && tokens.length > 0 ? { tokenTaken: true } : undefined),
        first()
      );
  }
}
