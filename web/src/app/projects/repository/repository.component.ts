import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { RepositoryService } from '../../core/services/index.service';
import { RepositoryModel } from '../../shared/models/index.model';

@Component({
  selector: 'dashboard-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RepositoryComponent implements OnInit {

  private repositorySubscription: Subscription;

  @Input()
  public uid: string;

  public repository: RepositoryModel = new RepositoryModel('');

  constructor(
    private repositoryService: RepositoryService
  ) {
  }

  ngOnInit(): void {
    this.repositorySubscription = this.repositoryService
      .findOneById(this.uid)
      .subscribe((repository: RepositoryModel) => this.repository = repository);
  }

  ngDestroy(): void {
    this.repositorySubscription
      .unsubscribe();
  }
}
