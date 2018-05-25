import { Component, Input } from '@angular/core';
import { Environment } from '../environment.model';

@Component({
  selector: 'qs-environments-view',
  templateUrl: './environments-view.component.html',
})
export class EnvironmentsViewComponent {

  @Input() public environment: Environment = new Environment();

}
