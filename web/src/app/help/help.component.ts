import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Help } from './help';
import { MatDialog } from '@angular/material';
import { DialogMarkdownComponent } from '../dialog/markdown/dialog-markdown.component';

@Component({
  selector: 'qs-help',
  templateUrl: './help.component.html',
})
export class HelpComponent {

  public filteredTopics: Help[] = [];
  public topics: Help[] = [
    {
      title: 'Quickstart',
      description: 'Overview information on getting started',
      icon: 'flight_takeoff',
      path: 'quickstart',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Types of Environments',
      description: 'What are the different types available and what do they mean',
      icon: 'merge_type',
      path: 'environment-types',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'How to Beacon your version',
      description: 'Example usage in TravisCI and CircleCI',
      icon: 'build',
      path: 'ci-usage',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Create Environment',
      description: 'What is an environment and how do I create one?',
      icon: 'computer',
      path: 'create-environment',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Edit Environment',
      description: 'How can I edit an environment?',
      icon: 'edit',
      path: 'edit-environment',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Delete Environment',
      description: 'How do I delete an environment?',
      icon: 'delete',
      path: 'delete-environment',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Badges',
      description: 'How do I use a DashboardHub badge?',
      icon: 'stars',
      path: 'badges',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Using CI to Beacon deploy',
      description: 'How do I use CI to beacon deploy?',
      icon: 'arrow_upward',
      path: 'use-ci-beacon-deploy',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'How to support us',
      description: 'Coming Soon',
      icon: 'help_outline',
      path: 'coming-soon',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Why Open Source?',
      description: 'Coming Soon',
      icon: 'help_outline',
      path: 'coming-soon',
      updatedAt: '03/01/2018 11:05 AM',
    },
    {
      title: 'Communication',
      description: 'Coming Soon',
      icon: 'help_outline',
      path: 'coming-soon',
      updatedAt: '03/01/2018 11:05 AM',
    },
  ];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.topics.forEach((help: { title: string, path: string }, index: number) => {
      this.http.get(`/assets/help/${help.path}.md`, { responseType: 'text' }).subscribe((content: string) => {
        this.topics[index].content = content;
      });
    });
    this.filteredTopics = this.topics;
  }

  filterTopics(keyword: string = ''): void {
    this.filteredTopics = this.topics.filter((help: Help) => {
      return help.title.toLowerCase().includes(keyword.toLowerCase()) || help.description.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  openDialog(help: Help): void {
    this.dialog.open(DialogMarkdownComponent, {
      width: '800px',
      data: {
        title: help.title,
        content: help.content,
      },
    });
  }
}
