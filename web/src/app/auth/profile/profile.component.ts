import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../list';
import { Environment } from '../../environments/environment.model';

@Component({
  selector: 'qs-auth-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  profile: any;
  environments: List<Environment>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'];
    this.environments = this.route.snapshot.data['environments'];
  }

}
