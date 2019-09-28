// Core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub interceptors
import { ErrorHttpInterceptorModule } from '@core/interceptors/error.http.interceptor';
import { GitHubHttpInterceptorModule } from '@core/interceptors/github.http.interceptor';

// Dashboard hub material module
import { AppMaterialModule } from '@app/app-material.module';

@NgModule({
  imports: [
    CommonModule, AppMaterialModule, GitHubHttpInterceptorModule, ErrorHttpInterceptorModule,
  ],
  declarations: [],
  providers: [],
})
export class CoreModule {
}
