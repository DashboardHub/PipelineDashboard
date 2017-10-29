import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { Profile } from "./profile";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(private auth: AuthService) {}

  resolve(): Observable<any>|any {
    // this.auth.subscribeProfile()
    //   .subscribe(profile => this.profile = profile);
    let profile = this.auth.subscribeProfile();
    this.auth.getProfile((err) => console.log);
    return profile;
    // return {
    //   name: "SAJ",
    //   nickname: "sarajaoude",
    //   picture: "https://avatars0.githubusercontent.com/u/11989248?v=4",
    //   sub: "github|11989248",
    //   updated_at: "2017-10-15T10:39:31.440Z"
    // };
  }
}
