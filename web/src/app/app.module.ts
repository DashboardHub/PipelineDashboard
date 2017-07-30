import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';

import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule } from '@covalent/core';
import { EnvironmentAddComponent } from './environments/environment-add/environment-add.component';
import { EnvironmentViewComponent } from './environments/environment-view/environment-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EnvironmentsComponent },
  { path: 'environments', pathMatch: 'full', component: EnvironmentsComponent },
  { path: 'environments/add', pathMatch: 'full', component: EnvironmentAddComponent },
  { path: 'environments/:id', pathMatch: 'full', component: EnvironmentViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentsComponent,
    EnvironmentAddComponent,
    EnvironmentViewComponent
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
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
