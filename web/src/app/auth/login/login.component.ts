import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
    selector: 'dashboard-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private authService: AuthService) {
    }

    login(): void {
        this.authService.login();
    }
}
