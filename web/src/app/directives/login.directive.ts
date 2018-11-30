import { Directive, HostListener } from '@angular/core';

// import { AuthenticationService } from 'src/services/authentication.service';

@Directive({
    selector: '[dashboardLogin]'
})
export class LoginDirective {

    public constructor(
        // public authService: AuthenticationService,
    ) {
    }

    @HostListener('click') navigateLogin(): void {
        // this.authService.login();
    }
}
