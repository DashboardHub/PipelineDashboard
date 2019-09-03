import { NgModule } from '@angular/core';

// Dashboard hub core modules
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule { }
