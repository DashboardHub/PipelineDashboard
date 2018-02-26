import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Environment } from '../../environment/environment';
import { List } from '../../list';

@Component({
  selector: 'app-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
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
