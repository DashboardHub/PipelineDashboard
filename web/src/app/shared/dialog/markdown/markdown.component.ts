// Core modules
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Third party modules
import { HttpClient } from '@angular/common/http';

// Application models
import { Help } from '@app/main/components/help/help';
import { HelpModel } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownComponent implements OnInit {

  public data: HelpModel = new HelpModel();

  /**
   * Life cycle method
   * @param http HttpClient instance
   * @param route ActivatedRoute instance
   */
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  /**
   * Life cycle init method
   * Find the topics based upon the help path and display it in markdown component
   */
  ngOnInit(): void {
    const path: string = this.route.snapshot.paramMap.get('path');
    const topics: Help[] = this.data.topics;
    this.http.get(`/assets/help/${path}.md`, { responseType: 'text' }).subscribe((content: string) => {
      this.data.content = content;
    });

    const filteredTopic: Help =  topics.find((topic: Help) => topic.path === path);
    this.data.icon  = filteredTopic.icon;
    this.data.title = filteredTopic.title;
  }
}
