import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'qs-legal-terms-conditions',
  templateUrl: './terms-conditions.component.html',
})
export class TermsConditionsComponent {

  public content: string;

  constructor(private http: HttpClient) {
    this.http.get(`/assets/legal/terms-conditions.md`, { responseType: 'text' }).subscribe((content: string) => {
      this.content = content;
    });
  }
}
