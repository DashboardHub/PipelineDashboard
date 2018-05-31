import { Component, OnInit } from '@angular/core';
import { List } from '../../list';
import { Release } from './release.model';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from './release.service';


@Component({
  selector: 'qs-environments-releases',
  templateUrl: './environments-releases.component.html'
})
export class EnvironmentsReleasesComponent implements OnInit {
  public releases: List<Release> = new List<Release>();
  public environmentId: string;

  constructor(
    private route: ActivatedRoute,
    private releaseService: ReleaseService,
  ) {
    this.environmentId = this.route.snapshot.params.id;
  }

  refresh(): void {
    this.releaseService
      .findAllByEnvironmentId(this.environmentId).subscribe((releases: List<Release>) => this.releases = releases);
  }

  ngOnInit(): void {
    this.releases = this.route.snapshot.data.releases;
  }
}
