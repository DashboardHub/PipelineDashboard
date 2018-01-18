import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Environment } from "../environment";
import { ActivatedRoute, Router } from "@angular/router";
import { EnvironmentService } from "../environment.service";

@Component({
  selector   : 'app-environment-delete',
  templateUrl: './environment-delete.component.html',
  animations : fuseAnimations
})
export class EnvironmentDeleteComponent implements OnInit {

  name: string = '';
  environment: Environment = new Environment('');
  deleteEnvironment: Environment = new Environment('');

  constructor(private route: ActivatedRoute, private router: Router, private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

  delete(): void {
    if (this.environment.title === this.deleteEnvironment.title) {
      this.environmentService
        .deleteEnvironment(this.environment.id)
        .subscribe(data => {
          this.router.navigate(['/environment/list'])
        });
    }
  }
}
