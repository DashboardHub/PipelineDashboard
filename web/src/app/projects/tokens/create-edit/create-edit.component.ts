import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

// Dashboard model and services
import { ProjectService } from '../../../core/services/index.service';
import { TokenService } from '../../../core/services/token.service';
import { ProjectTokenModel } from '../../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens-create',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditProjectTokenComponent implements OnInit {

  private createEditSubscription: Subscription;
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
      name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
    if (this.uid) {
      this.isEdit = true;
      this.projectSubscription = this.route.data
        .subscribe((data: { token: ProjectTokenModel }) => this.tokenForm.reset(data.token));
    }
  }

  // This function will create project and edit project details based upon if click on edit or add
  save(): void {
    if (this.uid) {
      this.createEditSubscription = this.tokenService
        .save(this.projectUid, { uid: this.uid, ...this.tokenForm.getRawValue() })
        .subscribe(
          () => this.router.navigate(['/projects', this.projectUid, 'tokens']),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    } else {
      this.createEditSubscription = this.tokenService
        .create(this.projectUid, this.tokenForm.getRawValue())
        .subscribe(
          (token: ProjectTokenModel) => this.router.navigate(['/projects', this.projectUid, 'tokens']),
          (error: any): any => this.snackBar.open(error.message, undefined, { duration: 5000 })
        );
    }
  }

  ngDestroy(): void {
    this.createEditSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }
}
