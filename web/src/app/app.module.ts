import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Dashboard hub components
import { AppComponent } from './app.component';

export function tokenGetter(): string | null {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent
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
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    providers: [
        { provide: FunctionsRegionToken, useValue: 'us-central1' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
