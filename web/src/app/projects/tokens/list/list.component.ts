// Angular modules
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { map, take } from 'rxjs/operators';

// Dashboard model and services
import { ProjectTokenService } from '../../../core/services/index.service';
import { ProjectTokenModel } from '../../../shared/models/index.model';

@Component({
  selector: 'dashboard-project-tokens-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListProjectTokenComponent {

  public projectUid: string;
  public tokenList: ProjectTokenModel[];

  constructor(
    private projectTokenService: ProjectTokenService,
    private route: ActivatedRoute
  ) {
    this.projectUid = this.route.snapshot.paramMap.get('projectUid');
    this.route.data
      .pipe(
        map((data: { tokens: ProjectTokenModel[] }) => data.tokens),
        take(1)
      )
      .subscribe((data: ProjectTokenModel[]) => this.tokenList = data);
  }

  // This function delete the project token
  delete(token: ProjectTokenModel): void {
    this.projectTokenService
      .delete(this.projectUid, token.uid)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.projectTokenService.findAll(this.projectUid)
          .pipe(
            take(1)
          )
          .subscribe((data: ProjectTokenModel[]) => this.tokenList = data);
      });
  }

}
