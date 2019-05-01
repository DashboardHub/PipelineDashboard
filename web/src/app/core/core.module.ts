import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub interceptors
import { ErrorHttpInterceptorModule } from '../core/interceptors/error.http.interceptor';
import { GitHubHttpInterceptorModule } from '../core/interceptors/github.http.interceptor';

// Dashboard hub material module
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    CommonModule, AppMaterialModule, GitHubHttpInterceptorModule, ErrorHttpInterceptorModule
  ],
  declarations: [],
  providers: []
})
export class CoreModule {
}
