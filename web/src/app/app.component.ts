import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';
import { Profile } from "./auth/profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  version: string = environment.version;

  profile: Profile;

  constructor(private auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err) => console.log);
    }

    this.auth.subscribeProfile()
      .subscribe(profile => this.profile = profile);
  }
}
