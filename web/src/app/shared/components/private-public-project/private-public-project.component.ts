// Core modules
import { Component, Input } from '@angular/core';

// Dashboard hub model and services
import { IProject } from '../../models/index.model';

/**
 * Private public project component
 */
@Component({
  selector: 'dashboard-projects-private-public',
  templateUrl: './private-public-project.component.html',
  styleUrls: ['./private-public-project.component.scss'],
})
export class PrivatePublicProjectComponent {

  @Input() projects: IProject[] = [];
  @Input() title: string;
  @Input() showTitle: boolean = false;

}
