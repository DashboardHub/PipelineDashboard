import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Third party modules
import { throwError, Observable, Subscription } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

// Dashboard model and services
import { TokenService } from '../../../core/services/token.service';
import { IProjectTokenModel } from '../../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens-create',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditProjectTokenComponent implements OnInit {

  private projectSubscription: Subscription;
  private projectUid: string;
  private uid: string;

  public isEdit: Boolean = false;
  public tokenForm: FormGroup;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.tokenForm = this.form.group({
      name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)], [this.validateTokenNotTaken.bind(this)]],
    });
    if (this.uid) {
      this.isEdit = true;
      this.projectSubscription = this.route.data
        .subscribe((data: { token: IProjectTokenModel }) => this.tokenForm.reset(data.token));
    }
  }

  // This function will create project token and edit project token details based upon if click on edit or add
  save(): void {
    this.tokenService.findProjectTokenByName(this.projectUid, this.tokenForm.get('name').value)
      .pipe(
        first(),
        switchMap((tokens: IProjectTokenModel[]) => {
          const error: any = tokens && tokens.length > 0 ? { tokenTaken: true } : undefined;

          if (error) {
            this.tokenForm.controls.name.setErrors(error);
            return throwError(new Error('Entered token is taken.'));
          }

          if (this.uid) {
            return this.tokenService.save(this.projectUid, { uid: this.uid, ...this.tokenForm.getRawValue() });
          } else {
            return this.tokenService.create(this.projectUid, this.tokenForm.getRawValue());
          }
        }),
        first()
      )
      .subscribe(
        () => this.router.navigate(['/projects', this.projectUid, 'tokens']),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }

  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  // This function will check the project token on uniqueness
  private validateTokenNotTaken(control: AbstractControl): Observable<any> {
    return this.tokenService.findProjectTokenByName(this.projectUid, control.value)
      .pipe(
        map((tokens: IProjectTokenModel[]) => tokens && tokens.length > 0 ? { tokenTaken: true } : undefined),
        first()
      );
  }
}
