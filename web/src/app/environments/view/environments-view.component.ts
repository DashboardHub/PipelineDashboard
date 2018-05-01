import { Component, Input } from '@angular/core';
import { Environment } from "../environment.model";
import { Profile } from "../../auth/profile";

@Component({
  selector: 'qs-environments-view',
  templateUrl: './environments-view.component.html',
})
export class EnvironmentsViewComponent {

  @Input() public environment: Environment = new Environment();
  @Input() public profile: Profile = new Profile();

}
