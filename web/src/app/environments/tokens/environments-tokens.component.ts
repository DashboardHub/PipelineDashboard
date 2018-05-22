import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../list';
import { TokenForm } from './token.form';
import { Token } from './token.model';
import { TokenService } from './token.service';
import { DialogMarkdownComponent } from '../../dialog/markdown/dialog-markdown.component';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'qs-environments-tokens',
  templateUrl: './environments-tokens.component.html',
})
export class EnvironmentsTokensComponent implements OnInit {

  public environmentId: string;
  public tokens: List<Token> = new List<Token>();
  public mask: string = 'xxxxxxxx-xxxx-xxxx-xxxx-';
  public form: TokenForm = new TokenForm();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
  ) {

  }

  ngOnInit(): void {
    this.environmentId = this.route.snapshot.params.id;
    this.tokens = this.maskAll(this.route.snapshot.data.tokens);
  }

  unMask(selectedToken: Token): void {
    this.tokens.list.map((token: Token) => {
      if (token.id === selectedToken.id) {
        token.idMasked = token.id;
      }

      return token;
    });
  }

  maskAll(tokens: List<Token>): List<Token> {
    tokens.list.map((token: Token) => {
      token.idMasked = this.mask + token.id.substr(24);
      return token;
    });

    return tokens;
  }

  delete(deleteToken: Token): void {
    deleteToken.environmentId = this.environmentId;
    this.tokenService
      .delete(deleteToken)
      .subscribe(
        () => this.refresh(),
        (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 }),
      );
  }

  submit(form: AbstractControl): void {
    let newToken: Token = new Token();
    newToken.environmentId = this.environmentId;
    newToken.name = form.value.name;
    this.tokenService
      .add(newToken)
      .subscribe(
        () => this.refresh(),
        (error: any) => this.snackBar.open(error.message, undefined, { duration: 5000 }),
      );
  }

  refresh(): void {
    this.tokenService
      .findAllByEnvironmentId(this.environmentId)
      .subscribe((tokens: List<Token>) => this.tokens = this.maskAll(tokens));
  }

  openDialog(token: Token): void {
    let curl: any = (state: string): string => `
        \`\`\`bash
        curl -XPOST \\
           -H "Content-Type: application/json" \\
           -d '{ "release":"vX.Y.Z" }' \\
           ${environment.api}/environments/${this.environmentId}/deployed/${token.id}/${state}
        \`\`\`
        `;

    this.dialog.open(DialogMarkdownComponent, {
      width: '800px',
      data: {
        title: `${token.name} token`,
        content: `
        Example usage of \`curl\` commands to send data to **DashboardHub**

        ### Build Status

        *Note: if **environment** \`type\` is \`build\` or \`build and deploy\`*

        ${curl('startBuild')}
        ${curl('finishBuild')}
        ${curl('failBuild')}

        ### Deploy Status

        *Note: if **environment** \`type\` is \`deploy\` or \`build and deploy\`*

        ${curl('startDeploy')}
        ${curl('finishDeploy')}
        ${curl('failDeploy')}
        `,
      },
    });
  }
}
