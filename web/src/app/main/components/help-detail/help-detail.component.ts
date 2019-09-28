// Core modules
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Application models
import { HelpModel, HelpTopic } from '@shared/models/index.model';

@Component({
  selector: 'dashboard-help-detail',
  templateUrl: './help-detail.component.html',
  styleUrls: ['./help-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HelpDetailComponent implements OnInit {

  public data: HelpModel = new HelpModel();

  /**
   * Life cycle method
   * @param route ActivatedRoute instance
   */
  constructor(
    private route: ActivatedRoute
  ) { }

  /**
   * Life cycle init method
   * Find the topics based upon the help path and display it in help detail component
   */
  ngOnInit(): void {
    this.route.data.subscribe((data: string[]) => this.data.content = data[0]);
    const path: string = this.route.snapshot.paramMap.get('path');
    const topics: HelpTopic[] = this.data.topics;
    const filteredTopic: HelpTopic = topics.find((topic: HelpTopic) => topic.path === path);
    this.data.icon = filteredTopic.icon;
    this.data.title = filteredTopic.title;
  }
}
