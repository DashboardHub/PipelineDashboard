import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';
import { Profile } from "./auth/profile";

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  version: string = environment.version;

  profile: Profile;

  subscription: Subscription;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    this.subscription = this.auth.subscribeProfile().subscribe(profile => { this.profile = profile; });
  }
}
