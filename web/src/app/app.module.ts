import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { EnvironmentsListComponent } from './environments/list/environments-list.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';

import { ApiHttpInterceptorModule } from '../interceptors/api.http.interceptor';
import { ErrorHttpInterceptorModule } from '../interceptors/error.http.interceptor';

import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from './charts.module';
import { MaterialModule } from './material.module';
import { AppRoutesModule } from './routes.module';

export function tokenGetter(): string | null {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        EnvironmentsListComponent,
        EnvironmentsListPublicComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ChartsModule,
        MaterialModule,
        PipesModule,
        AppRoutesModule,
        ApiHttpInterceptorModule,
        ErrorHttpInterceptorModule
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
