import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { TokensService } from './../tokens.service';
import { List } from './../../list';
import { Token } from './../token';
import { ActivatedRoute } from "@angular/router";
import { TdDialogService } from "@covalent/core";

import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  tokens: List<Token> = new List<Token>();

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
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

  commands(state, token): void {
    this.dialogService.openAlert({
      message: `curl -XPOST -H "Content-Type: application/json" ${environment.api}/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${token.id}/${state}`,
      viewContainerRef: this.viewContainerRef, //OPTIONAL
      title: `${state} command for "${token.name}" token`, //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
    });
  }
}
