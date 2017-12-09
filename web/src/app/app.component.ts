import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';
import { Profile } from "./auth/profile";
import { EnvironmentsService } from "./environments/environments.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EnvironmentsService]
})
export class AppComponent implements OnInit {
  version: string = environment.version;

  profile: Profile;

  constructor(public auth: AuthService, private route: ActivatedRoute) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    this.auth.subscribeProfile()
      .subscribe(profile => this.profile = profile);
  }
}
