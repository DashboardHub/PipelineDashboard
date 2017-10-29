import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  MatToolbarModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule, MatButtonModule, MatInputModule, MatTooltipModule, MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule } from '@covalent/core';
import { EnvironmentAddComponent } from './environments/environment-add/environment-add.component';
import { EnvironmentViewComponent } from './environments/environment-view/environment-view.component';
import { EnvironmentEditComponent } from './environments/environment-edit/environment-edit.component';
import { MomentModule } from 'angular2-moment';
import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from "./auth/callback.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { AuthGuard } from "./auth/auth.guard";

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EnvironmentListComponent } from "./environments/environment-list/environment-list.component";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type':'application/json'}]
  }), http, options);
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EnvironmentsComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'environments',
    canActivate: [AuthGuard],
    children: [
      { path: 'list', pathMatch: 'full', component: EnvironmentListComponent },
      { path: 'add', pathMatch: 'full', component: EnvironmentAddComponent },
      { path: ':id/edit', pathMatch: 'full', component: EnvironmentEditComponent },
      { path: ':id', pathMatch: 'full', component: EnvironmentViewComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    EnvironmentsComponent,
    EnvironmentAddComponent,
    EnvironmentViewComponent,
    EnvironmentEditComponent,
    EnvironmentListComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    MomentModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
