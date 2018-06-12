import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'qs-legal-privacy',
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {

  public content: string;

  constructor(private http: HttpClient) {
    this.http.get(`/assets/legal/privacy.md`, { responseType: 'text' }).subscribe((content: string) => {
      this.content = content;
    });
  }
}
