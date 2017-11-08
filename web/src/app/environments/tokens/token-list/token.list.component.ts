import { Component, OnInit } from '@angular/core';

import { TokensService } from './../tokens.service';
import { List } from './../../list';
import { Token } from './../token';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  tokens: List<Token> = new List<Token>();

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokensService
  ) {
  }

  ngOnInit() {
    this.tokenService.subscribeTokens()
      .subscribe(tokens => {
        this.tokens = tokens
      });

    this.getTokens(this.route.snapshot.params.id);
  }

  getTokens(environmentId: string): void {
    this.tokenService
      .getTokens(environmentId);
  }

  deleteToken(token: Token): void {
    this.tokenService
      .deleteToken(token);
  }

}
