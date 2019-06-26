import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Dashboard model and services
import { ProjectTokenService } from '../../core/services/project-token.service';
import { ProjectTokenModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
})
export class ProjectTokensComponent {

  public projectUid: string;
  public tokens$: Observable<ProjectTokenModel[]>;

  constructor(
    private projectTokenService: ProjectTokenService,
    private route: ActivatedRoute
  ) {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.tokens$ = this.route.data
      .pipe(
        map((data: { tokens: ProjectTokenModel[] }) => data.tokens)
      );
  }

  // This function delete the project token
  delete(token: ProjectTokenModel): void {
    this.projectTokenService
      .delete(this.projectUid, token.uid)
      .pipe(
        take(1)
      )
      .subscribe(() => this.tokens$ = this.projectTokenService.findAll(this.projectUid));
  }

}
