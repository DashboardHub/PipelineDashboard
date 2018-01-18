import { Component, Input } from '@angular/core';
import { Environment } from "../environment";

@Component({
  selector   : 'environment-sidenav',
  templateUrl: './environment-sidenav.component.html'
})
export class EnvironmentSidenavComponent {

  @Input() environment: Environment
}
