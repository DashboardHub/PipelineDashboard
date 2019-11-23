// Core modules
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Rxjs operators
import { debounceTime } from 'rxjs/operators';

import { HelpModel, HelpTopic } from '@shared/models/index.model';

/**
 * Help component
 */
@Component({
  selector: 'dashboard-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  public searchForm: FormGroup;
  public filteredTopics: HelpTopic[] = [];
  public help: HelpModel = new HelpModel();
  public topics: HelpTopic[];

  /**
   * Life cycle method
   * @param http HttpClient
   * @param form FormBuilder
   * @param dialog MatDialog
   */
  constructor(
    private http: HttpClient,
    private form: FormBuilder
  ) { }

  /**
   * Life cycle init method
   */
  ngOnInit(): void {
    this.topics = this.help.topics;
    this.topics.forEach((help: { title: string, path: string }, index: number) => {
      this.http.get(`/assets/help/${help.path}.md`, { responseType: 'text' }).subscribe((content: string) => {
        this.topics[index].content = content;
      });
    });
    this.filteredTopics = this.topics;

    this.searchForm = this.form.group({
      search: [undefined, []],
    });

    this.searchForm.get('search').valueChanges.subscribe((search: string) => this.filterTopics(search));
  }

  /**
   * Searches the topics in help page
   * @param keyword key to search in help page
   */
  filterTopics(keyword: string = ''): void {
    this.filteredTopics = this.topics.filter((help: HelpTopic) => {
      return help.title.toLowerCase().includes(keyword.toLowerCase()) || help.description.toLowerCase().includes(keyword.toLowerCase());
    });
  }
}
