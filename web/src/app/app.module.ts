import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { LoginDirective } from './directives/login.directive';
import { MarkdownDirective } from './directives/markdown.directive';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsEditComponent } from './environments/edit/environments-edit.component';
import { EnvironmentsListComponent } from './environments/list/environments-list.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { EnvironmentsReleasesComponent } from './environments/releases/environments-releases.component';
import { EnvironmentsTokensComponent } from './environments/tokens/environments-tokens.component';
import { EnvironmentsViewComponent } from './environments/view/environments-view.component';
import { EnvironmentsViewPublicComponent } from './environments/view/public/environments-view-public.component';
import { EnvironmentsViewPrivateComponent } from './environments/view/private/environments-view-private.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { MonitorsAddComponent } from './environments/monitors/add/monitors-add.component';
import { MonitorsListComponent } from './environments/monitors/list/monitors-list.component';
import { MonitorsViewComponent } from './environments/monitors/view/monitors-view.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { ProjectsAddComponent } from './projects/add/projects-add.component';
import { ProjectsListComponent } from './projects/list/projects-list.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';

import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { DialogMarkdownComponent } from './dialog/markdown/dialog-markdown.component';

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
        LoginDirective,
        MarkdownDirective,
        EnvironmentsAddComponent,
        EnvironmentsEditComponent,
        EnvironmentsListComponent,
        EnvironmentsListPublicComponent,
        EnvironmentsListPrivateComponent,
        EnvironmentsReleasesComponent,
        EnvironmentsTokensComponent,
        EnvironmentsViewComponent,
        EnvironmentsViewPublicComponent,
        EnvironmentsViewPrivateComponent,
        FeaturesComponent,
        HelpComponent,
        MonitorsAddComponent,
        MonitorsListComponent,
        MonitorsViewComponent,
        TermsConditionsComponent,
        PrivacyComponent,
        ProjectsAddComponent,
        ProjectsListComponent,
        DialogConfirmationComponent,
        DialogMarkdownComponent
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
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
    ],
    providers: [],
    entryComponents: [
        DialogConfirmationComponent,
        DialogMarkdownComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
