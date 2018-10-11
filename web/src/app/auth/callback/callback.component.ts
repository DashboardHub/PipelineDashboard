import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth.service';

@Component({
    selector: 'dashboard-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

    constructor(private router: Router, private auth: AuthService) {
        auth.handleAuthentication();
        Observable.interval(1000).take(1).subscribe(() => this.router.navigate(['/']));
    }
}
