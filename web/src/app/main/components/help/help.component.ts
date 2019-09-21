import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Rxjs operators
import { debounceTime } from 'rxjs/operators';

import { HelpModel } from '@shared/models/help.model';
import { Help } from './help';

@Component({
  selector: 'dashboard-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  public searchForm: FormGroup;
  public filteredTopics: Help[] = [];
  public help: HelpModel = new HelpModel();
  public topics: Help[];

  constructor(
    private http: HttpClient,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.topics = this.help.getTopicsList();
    this.topics.forEach((help: { title: string, path: string }, index: number) => {
      this.http.get(`/assets/help/${help.path}.md`, { responseType: 'text' }).subscribe((content: string) => {
        this.topics[index].content = content;
      });
    });
    this.filteredTopics = this.topics;

    this.searchForm = this.form.group({
      search: [undefined, []],
    });

    this.searchForm.get('search').valueChanges.pipe(debounceTime(500)).subscribe((search: string) => this.filterTopics(search));
  }

  // This function searches the topics in help page
  filterTopics(keyword: string = ''): void {
    this.filteredTopics = this.topics.filter((help: Help) => {
      return help.title.toLowerCase().includes(keyword.toLowerCase()) || help.description.toLowerCase().includes(keyword.toLowerCase());
    });
  }
}
