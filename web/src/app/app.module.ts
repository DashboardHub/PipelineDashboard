import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

// Third party modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';

// Dashboard hub modules
import { AppRoutingModule } from './app-routing.module';
import { GitHubHttpInterceptorModule } from '../interceptors/github.http.interceptor';
import { ErrorHttpInterceptorModule } from '../interceptors/error.http.interceptor';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from './shared/shared.module';

// Dashboard hub components
import { AppComponent } from './app.component';
import { CreateProjectComponent } from './projects/create/create.component';
import { DialogListComponent } from './dialog/list/dialog-list.component';
import { EditProjectComponent } from './projects/edit/edit.component';
import { FeaturesComponent } from './features/features.component';
import { HelpComponent } from './help/help.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main.component';
import { PublicProjectsComponent } from './projects/public/public.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { PrivateProjectsComponent } from './projects/private/private.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { RepositoryComponent } from './projects/repository/repository.component';
import { TermsConditionsComponent } from './legal/terms-conditions/terms-conditions.component';
import { ViewProjectComponent } from './projects/view/view.component';

// Dashboard hub dialog components
import { DialogConfirmationComponent } from './dialog/confirmation/dialog-confirmation.component';
import { DialogMarkdownComponent } from './dialog/markdown/dialog-markdown.component';

// Dashboard hub directive 
import { MarkdownDirective } from './directives/markdown.directive';

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
        HomepageComponent,
        MainComponent,
        MarkdownDirective,
        PrivacyComponent,
        PrivateProjectsComponent,
        ProfileComponent,
        ProjectsComponent,
        PublicProjectsComponent,
        RepositoryComponent,
        TermsConditionsComponent,
        ViewProjectComponent,
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        AngularFireFunctionsModule,
        BrowserAnimationsModule,
        CommonModule,
        DeviceDetectorModule.forRoot(),
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ErrorHttpInterceptorModule,
        GitHubHttpInterceptorModule,
        PipesModule,
        SharedModule
    ],
    providers: [
        { provide: FunctionsRegionToken, useValue: 'us-central1' }
    ],
    entryComponents: [
        DialogConfirmationComponent,
        DialogListComponent,
        DialogMarkdownComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
