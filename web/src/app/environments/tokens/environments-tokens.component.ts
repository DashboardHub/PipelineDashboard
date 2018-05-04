import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../list';
import { TokenForm } from './token.form';
import { Token } from './token.model';
import { TokenService } from './token.service';

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
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
  ) {

  }

  ngOnInit() {
    this.environmentId = this.route.snapshot.params['id'];
    this.tokens = this.maskAll(this.route.snapshot.data['tokens']);
  }

  unMask(selectedToken: Token): void {
    this.tokens.list.map((token) => {
      if (token.id === selectedToken.id) {
        token.idMasked = token.id;
      }

      return token;
    });
  }

  maskAll(tokens: List<Token>): List<Token> {
    tokens.list.map((token) => {
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
        (error) => this.snackBar.open(error.message, null, { duration: 5000 })
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
        (error) => this.snackBar.open(error.message, null, { duration: 5000 })
      );
  }

  refresh(): void {
    this.tokenService
      .findAllByEnvironmentId(this.environmentId)
      .subscribe((tokens) => this.tokens = this.maskAll(tokens));
  }
}
