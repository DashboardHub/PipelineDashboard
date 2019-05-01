import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard hub routing modules
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

// Dashboard hub components
import { MainComponent } from './main.component';
import { TermsConditionsComponent } from './components/legal/terms-conditions/terms-conditions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HelpComponent } from './components/help/help.component';
import { FeaturesComponent } from './components/features/features.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [MainComponent,
    FeaturesComponent,
    HelpComponent,
    HomepageComponent,
    PrivacyComponent,
    ProfileComponent,
    TermsConditionsComponent
  ]
})
export class MainModule { }
