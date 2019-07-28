// Angular modules
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Third party modules
import { throwError, Observable, Subscription } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

// Dashboard model and services
import { ProjectTokenService } from '../../core/services/index.service';
import { ProjectTokenModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens-create-edit',
  templateUrl: './tokens-create-edit.component.html',
  styleUrls: ['./tokens-create-edit.component.scss'],
})
export class TokensCreateEditComponent implements OnInit {

  private projectSubscription: Subscription;
  private uid: string;

  public projectUid: string;
  public isEdit: Boolean = false;
  public tokenForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private projectTokenService: ProjectTokenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  // This function will be called when component is initialized
  ngOnInit(): void {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.tokenForm = this.form.group({
      name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)], [this.validateTokenNotTaken.bind(this)]],
    });
    if (this.uid) {
      this.isEdit = true;
      this.projectSubscription = this.route.data
        .subscribe((data: { token: ProjectTokenModel }) => this.tokenForm.reset(data.token));
    }
  }

  // This function will be called when component is destroyed
  ngDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  // This function click input field on name token
  clickInputName(e: MouseEvent): void {
    (e.toElement as any).blur();
    (e.toElement as any).focus();
  }

  // This function will create project token and edit project token details based upon if click on edit or add
  save(): void {
    this.projectTokenService.findProjectTokenByName(this.projectUid, this.tokenForm.get('name').value)
      .pipe(
        first(),
        switchMap((tokens: ProjectTokenModel[]) => {
          const error: any = tokens && tokens.length > 0 ? { tokenTaken: true } : undefined;

          if (error) {
            this.tokenForm.controls.name.setErrors(error);
            return throwError(new Error('Entered token is taken.'));
          }

          if (this.uid) {
            return this.projectTokenService.save(this.projectUid, { uid: this.uid, ...this.tokenForm.getRawValue() });
          } else {
            return this.projectTokenService.create(this.projectUid, this.tokenForm.getRawValue());
          }
        }),
        first()
      )
      .subscribe(
        () => this.router.navigate(['/projects', this.projectUid, 'tokens']),
        (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
      );
  }

  // This function check the project token on uniqueness
  private validateTokenNotTaken(control: AbstractControl): Observable<any> {
    return this.projectTokenService.findProjectTokenByName(this.projectUid, control.value)
      .pipe(
        map((tokens: ProjectTokenModel[]) => tokens && tokens.length > 0 ? { tokenTaken: true } : undefined),
        first()
      );
  }
}
