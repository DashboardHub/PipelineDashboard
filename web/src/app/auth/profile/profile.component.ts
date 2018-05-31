import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../list';
import { Environment } from '../../environments/environment.model';
import { Profile } from '../profile';
import { AuthService } from '../auth.service';

@Component({
  selector: 'qs-auth-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  profile: Profile;
  environments: List<Environment>;

  constructor(private authService: AuthService) {
    this.authService.subscribeProfile()
      .subscribe((profile: Profile) => this.profile = profile);
  }

}
