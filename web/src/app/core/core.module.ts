import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub interceptors
import { GitHubHttpInterceptorModule } from '../core/interceptors/github.http.interceptor';
import { ErrorHttpInterceptorModule } from '../core/interceptors/error.http.interceptor';

@NgModule({
  imports: [
    CommonModule, GitHubHttpInterceptorModule, ErrorHttpInterceptorModule
  ],
  declarations: [],
  providers: []
})
export class CoreModule {
}
