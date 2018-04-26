import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'qs-callback',
  templateUrl: './callback.component.html',
  styleUrls  : ['./callback.component.scss']
})
export class CallbackComponent {

  constructor(private auth: AuthService) {
    auth.handleAuthentication();
  }
}
