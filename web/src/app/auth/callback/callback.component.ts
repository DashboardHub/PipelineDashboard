import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'qs-callback',
  templateUrl: './callback.component.html',
  styleUrls  : ['./callback.component.scss'],
})
export class CallbackComponent {

  constructor(private router: Router, private auth: AuthService) {
    auth.handleAuthentication();
    Observable.interval(1000).take(1).subscribe(() =>  this.router.navigate(['/']));
  }
}
