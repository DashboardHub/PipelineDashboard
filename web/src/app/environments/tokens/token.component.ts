import { Component } from '@angular/core';
import { TokensService } from "./tokens.service";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  providers: [TokensService]
})
export class TokenComponent {

}
