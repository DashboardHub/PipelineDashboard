import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Dashboard hub routing modules
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

// Dashboard hub components
import { FeaturesComponent } from './components/features/features.component';
import { HelpComponent } from './components/help/help.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { TermsConditionsComponent } from './components/legal/terms-conditions/terms-conditions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  declarations: [MainComponent,
    FeaturesComponent,
    HelpComponent,
    HomepageComponent,
    PrivacyComponent,
    ProfileComponent,
    TermsConditionsComponent,
  ],
})
export class MainModule { }
