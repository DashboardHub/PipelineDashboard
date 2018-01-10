import { Component } from '@angular/core';
import { FuseConfigService } from './../../../../core/services/config.service';
import { fuseAnimations } from './../../../../core/animations';
import { AuthService } from "./../auth.service";

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent
{

  constructor(
    private fuseConfig: FuseConfigService,
    public auth: AuthService
  )
  {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar   : 'none',
        footer    : 'none'
      }
    });
  }

}
