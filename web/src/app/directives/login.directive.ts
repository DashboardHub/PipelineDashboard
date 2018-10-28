import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
    selector: '[dashboardLogin]'
})
export class LoginDirective {

    constructor(
        private authService: AuthService
    ) { }

    @HostListener('click') navigateLogin() {
        this.authService.login();
    }

}
