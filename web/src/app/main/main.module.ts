import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub routing modules
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

// Dashboard hub components
import { MainComponent } from './main.component';
import { ViewProjectComponent } from '../projects/view/view.component';
import { TermsConditionsComponent } from './components/legal/terms-conditions/terms-conditions.component';
import { RepositoryComponent } from '../projects/repository/repository.component';
import { PublicProjectsComponent } from '../projects/public/public.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrivateProjectsComponent } from '../projects/private/private.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HelpComponent } from './components/help/help.component';
import { FeaturesComponent } from './components/features/features.component';
import { EditProjectComponent } from '../projects/edit/edit.component';
import { CreateProjectComponent } from '../projects/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [MainComponent,
    CreateProjectComponent,
    EditProjectComponent,
    FeaturesComponent,
    HelpComponent,
    HomepageComponent,
    PrivacyComponent,
    PrivateProjectsComponent,
    ProfileComponent,
    ProjectsComponent,
    PublicProjectsComponent,
    RepositoryComponent,
    TermsConditionsComponent,
    ViewProjectComponent]
})
export class MainModule { }
