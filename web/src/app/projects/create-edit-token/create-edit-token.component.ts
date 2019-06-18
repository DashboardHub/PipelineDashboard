import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

// Rxjs components
import { Subscription } from 'rxjs';

// Dashboard hub services and models
import { TokenService } from '../../core/services/index.service';
import { TokenModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-tokens-create',
  templateUrl: './create-edit-token.component.html',
  styles: [`
  .example-container {
    display: flex;
    flex-direction: column;
    
  }
  .formCls{
    margin-top: 10px !important;
  }
  
  .example-container > * {
    width: 100%;
  }
  `]
})
export class CreateEditTokenComponent implements OnInit {

  private createEditSubscription: Subscription;
  private tokenSubscription: Subscription;
  public projectuid: string;
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
    this.projectuid = this.route.snapshot.paramMap.get('projectuid');

    this.uid = this.route.snapshot.paramMap.get('uid');
    this.tokenForm = this.form.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      projectuid: [this.projectuid, Validators.required]
    });
    
    if (this.uid) {
      this.isEdit = true;
      this.tokenSubscription = this.route.data
        .subscribe((data: { token: TokenModel }) => this.tokenForm.reset(data.token));

        this.createEditSubscription = this.tokenService
        .findOneById(this.uid)
        .subscribe(
          (tokenData) => {
            this.tokenForm.setValue({
              name: tokenData.name,
              projectuid: tokenData.uid
            });
          },
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  // This function will create token and edit token details based upon if click on edit or add
  save(): void {
    if (this.projectuid && this.uid) {
      this.createEditSubscription = this.tokenService
        .save({ uid: this.uid, ...this.tokenForm.getRawValue() })
        .subscribe(
          () => this.router.navigate(['/projects', this.projectuid, 'tokens']),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    } else {
      this.createEditSubscription = this.tokenService
        .create(this.tokenForm.getRawValue())
        .subscribe(
          (token: TokenModel) => this.router.navigate(['/projects', this.projectuid, 'tokens']),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  ngDestroy(): void {
    this.createEditSubscription.unsubscribe();
    this.tokenSubscription.unsubscribe();
  }
}
