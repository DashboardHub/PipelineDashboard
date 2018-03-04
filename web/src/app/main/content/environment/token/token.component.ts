import { Component, OnInit } from '@angular/core';
import { Environment } from "../environment";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "../../../../core/animations";
import { Token } from "./token";
import { TokenService } from "./token.service";

@Component({
  selector   : 'app-token',
  templateUrl: './token.component.html',
  animations : fuseAnimations
})
export class TokenComponent implements OnInit {

  environment: Environment = new Environment('');
  token: Token = new Token('');

  constructor(private route: ActivatedRoute, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

  add(): void {
    this.token.environmentId = this.environment.id;
    this.tokenService
      .add(this.token)
      .subscribe(data => {
        this.environment.tokens.push(data);
      });
  }

  delete(token): void {
    token.environmentId = this.environment.id;
    this.tokenService
      .delete(token)
      .subscribe(data => {
        this.environment.tokens = data ? data.list : [];
      });
  }

}
