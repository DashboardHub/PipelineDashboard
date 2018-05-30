import { Component, OnInit } from '@angular/core';
import { List } from '../../list';
import { Release } from './release.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qs-environments-releases',
  templateUrl: './environments-releases.component.html'
})
export class EnvironmentsReleasesComponent implements OnInit {
  public releases: List<Release> = new List<Release>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.releases = this.route.snapshot.data.releases;
  }
}
