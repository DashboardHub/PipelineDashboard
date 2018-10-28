import { Component, Input } from '@angular/core';

import { Environment } from '../../../models/environment.model';

@Component({
    selector: 'dashboard-environments-view',
    templateUrl: './environments-view.component.html',
})
export class EnvironmentsViewComponent {

    @Input() public environment: Environment = new Environment();

}
