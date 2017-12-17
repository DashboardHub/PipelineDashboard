import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Deployed } from "../deployed";
import { TokensService } from "../../tokens/tokens.service";
import { Token } from "../../tokens/token";
import { List } from "../../list";
import { DeployedService } from "../deployed.service";
import { State } from "../state";
import { Environment } from "../../environment";

@Component({
  selector: 'app-deployed-add',
  templateUrl: './deployed-add.component.html',
  styleUrls: ['./deployed-add.component.css']
})
export class DeployedAddComponent implements OnInit {

  states: Array<State>;
  environment: Environment;
  deployed: Deployed = new Deployed();
  tokens: List<Token> = new List<Token>();

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokensService,
    private deployedService: DeployedService
  ) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
    this.deployed.environmentId = this.route.snapshot.params.id;
    this.states = this.deployedService.states;

    this.tokenService.subscribeTokens()
      .subscribe(tokens => {
        this.tokens = tokens
      });
  }

  add(): void {
    this.deployedService
      .addDeployed(this.deployed);
  }

}
