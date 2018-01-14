import { Component } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent {

  constructor(private auth: AuthService) {
    auth.handleAuthentication();
  }
}
