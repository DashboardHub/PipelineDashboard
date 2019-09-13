import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

// Rxjs operators
import { debounceTime } from 'rxjs/operators';

// Dashboard hub components
import { DialogMarkdownComponent } from '@shared/dialog/markdown/dialog-markdown.component';
import { Help } from './help';

@Component({
  selector: 'dashboard-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  public searchForm: FormGroup;
  public filteredTopics: Help[] = [];
  public topics: Help[] = [
    {
      title: 'Quickstart',
      description: 'Overview information on getting started',
      icon: 'quickstart_icon',
      path: 'quickstart',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Glossary',
      description: 'Coming Soon',
      icon: 'glosary_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Create Project',
      description: 'Coming Soon',
      icon: 'create_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Edit Project',
      description: 'Coming Soon',
      icon: 'edit_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Delete Project',
      description: 'Coming Soon',
      icon: 'delete_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'How to support us',
      description: 'Coming Soon',
      icon: 'how_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Why Open Source?',
      description: 'Coming Soon',
      icon: 'why_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
  ];

  constructor(
    private http: HttpClient,
    private form: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

  // This function opens the dialog on help page
  openDialog(help: Help): void {
    this.dialog.open(DialogMarkdownComponent, {
      width: '800px',
      data: {
        icon: help.icon,
        title: help.title,
        content: help.content,
      },
    });
  }
}
