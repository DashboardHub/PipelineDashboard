import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
    selector: 'dashboard-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

    constructor(private router: Router, private auth: AuthService) {
        auth.handleAuthentication();
        interval(1000).pipe(take(1)).subscribe(() => this.router.navigate(['/']));
    }
}
