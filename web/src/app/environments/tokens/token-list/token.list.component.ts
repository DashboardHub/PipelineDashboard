import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { TokensService } from './../tokens.service';
import { List } from './../../list';
import { Token } from './../token';
import { ActivatedRoute } from "@angular/router";
import { TdDialogService } from "@covalent/core";

import { environment as config } from './../../../../environments/environment';
import { Environment } from "../../environment";
import { DeployedService } from "../../deployed/deployed.service";
import { State } from "../../deployed/state";

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  states: Array<State>;
  tokens: List<Token> = new List<Token>();
  environment: Environment;

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private tokenService: TokensService,
    private deployedService: DeployedService
  ) {
  }

  ngOnInit() {
    this.tokenService.subscribeTokens()
      .subscribe(tokens => {
        this.tokens = tokens
      });

    this.getTokens(this.route.snapshot.params.id);
    this.environment = this.route.snapshot.data['environment'];
    this.states = this.deployedService.states;
  }

  getTokens(environmentId: string): void {
    this.tokenService
      .getTokens(environmentId);
  }

  deleteToken(token: Token): void {
    this.tokenService
      .deleteToken(this.environment.id, token);
  }

  commands(state, token): void {
    this.dialogService.openAlert({
      message: `curl -XPOST -H "Content-Type: application/json" -d '{"release":"VERSION"}' ${config.api}/environments/${this.environment.id}/deployed/${token.id}/${state}`,
      viewContainerRef: this.viewContainerRef, //OPTIONAL
      title: `${state} command for "${token.name}" token`, //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
    });
  }
}
