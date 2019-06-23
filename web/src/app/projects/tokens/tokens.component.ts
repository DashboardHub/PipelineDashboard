import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Dashboard model and services
import { TokenService } from '../../core/services/token.service';
import { IProjectTokenModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
})
export class ProjectTokensComponent {

  public projectUid: string;
  public tokens$: Observable<IProjectTokenModel[]>;

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.tokens$ = this.route.data
      .pipe(
        map((data: { tokens: IProjectTokenModel[] }) => data.tokens)
      );
  }

  // This function delete the project token
  delete(token: IProjectTokenModel): void {
    this.tokenService
      .delete(this.projectUid, token.uid)
      .pipe(
        take(1)
      )
      .subscribe(() => this.tokens$ = this.tokenService.findAll(this.projectUid));
  }

}
