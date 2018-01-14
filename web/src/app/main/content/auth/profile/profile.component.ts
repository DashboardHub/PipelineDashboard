import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'];
  }

}
