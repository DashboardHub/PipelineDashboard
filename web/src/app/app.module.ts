import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { environment } from '../environments/environment';

import { MarkdownDirective } from './directives/markdown.directive';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';

import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { DialogMarkdownComponent } from './dialog/markdown/dialog-markdown.component';

import { GitHubHttpInterceptorModule } from '../interceptors/github.http.interceptor';
import { ErrorHttpInterceptorModule } from '../interceptors/error.http.interceptor';

import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from './charts.module';
import { MaterialModule } from './material.module';
import { AppRoutesModule } from './routes.module';
import { PrivateProjectsComponent } from './projects/private/private.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProjectComponent } from './projects/create/create.component';
import { PublicProjectsComponent } from './projects/public/public.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './projects/view/view.component';
import { EditProjectComponent } from './projects/edit/edit.component';
import { DialogListComponent } from './dialog/list/dialog-list.component';

export function tokenGetter(): string | null {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        CreateProjectComponent,
        DialogConfirmationComponent,
        DialogListComponent,
        DialogMarkdownComponent,
        EditProjectComponent,
        FeaturesComponent,
        HelpComponent,
        MainComponent,
        MarkdownDirective,
        PrivacyComponent,
        PrivateProjectsComponent,
        ProfileComponent,
        ProjectsComponent,
        PublicProjectsComponent,
        TermsConditionsComponent,
        ViewProjectComponent,
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        CommonModule,
        DeviceDetectorModule.forRoot(),
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ChartsModule,
        MaterialModule,
        PipesModule,
        AppRoutesModule,
        GitHubHttpInterceptorModule,
        ErrorHttpInterceptorModule,
    ],
    providers: [],
    entryComponents: [
        DialogConfirmationComponent,
        DialogListComponent,
        DialogMarkdownComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
