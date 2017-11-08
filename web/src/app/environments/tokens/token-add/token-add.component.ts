import {Component, OnInit} from '@angular/core';
import { Token } from "../token";
import { ActivatedRoute } from "@angular/router";
import { TokensService } from "../tokens.service";

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.css']
})
export class TokenAddComponent implements OnInit {

  token: Token = new Token('');

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokensService)
  {
  }

  ngOnInit() {
    this.token.environmentId = this.route.snapshot.params.id;
  }

  add(): void {
    this.tokenService
      .addToken(this.token);
  }

}
