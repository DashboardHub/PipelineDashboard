import { Component } from '@angular/core';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login(): void {
    console.log('login');
  }
}
