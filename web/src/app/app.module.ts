import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';

import { LoginDirective } from './directives/login.directive';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsListComponent } from './environments/list/environments-list.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';

import { ApiHttpInterceptorModule } from '../interceptors/api.http.interceptor';
import { ErrorHttpInterceptorModule } from '../interceptors/error.http.interceptor';

import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from './charts.module';
import { MaterialModule } from './material.module';
import { AppRoutesModule } from './routes.module';

export function tokenGetter(): string | null {
    console.log('hit');
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        CallbackComponent,
        LoginDirective,
        EnvironmentsAddComponent,
        EnvironmentsListComponent,
        EnvironmentsListPublicComponent,
        EnvironmentsListPrivateComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ChartsModule,
        MaterialModule,
        PipesModule,
        AppRoutesModule,
        ApiHttpInterceptorModule,
        ErrorHttpInterceptorModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: environment.whitelist,
            },
        })
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
