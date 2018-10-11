import { Component } from '@angular/core';

import { List } from '../../../models/list.model';
import { Environment } from '../../../models/environment.model';
import { Profile } from '../../../models/profile.model';

import { AuthService } from '../auth.service';

@Component({
    selector: 'dashboard-auth-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    profile: Profile;
    environments: List<Environment>;

    constructor(private authService: AuthService) {
        this.authService.subscribeProfile()
            .subscribe((profile: Profile) => this.profile = profile);
    }

}
