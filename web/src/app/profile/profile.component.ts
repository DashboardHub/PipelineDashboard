import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Profile, LoginAudit } from '../../models/index.model';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'dashboard-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    profile: Profile;
    logins: LoginAudit[];

    constructor(public authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.profile = this.authService.profile;
        this.authService
            .getLogins()
            .subscribe((logins: LoginAudit[]) => {
                this.logins = logins;
                console.log(logins.length);
            });
    }
}
