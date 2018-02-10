import { Component, ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpArticleComponent } from './dialogs/article/article.component';
import {HttpClient} from "@angular/common/http";
import { environment } from './../../../../environments/environment';

@Component({
  selector     : 'app-help',
  templateUrl  : './help.component.html',
  styleUrls    : ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent
{
  private url: string = environment.web;

  help: [{ title: string, featured: [{ title: string, path: string }] }] = [
    {
      title: 'Environment',
      featured: [
        {
          title: 'Quickstart',
          path: 'quickstart'
        },
        {
          title: 'Types of Environments',
          path: 'environment-types'
        },
        {
          title: 'Create',
          path: 'coming-soon'
        },
        {
          title: 'Edit Environment',
          path: 'coming-soon'
        },
        {
          title: 'Delete environment',
          path: 'coming-soon'
        },
        {
          title: 'Badges',
          path: 'coming-soon'
        }
      ]
    },
    {
      title: 'Deploy / Release',
      featured: [
        {
          title: 'How to Beacon deploy',
          path: 'coming-soon'
        },
        {
          title: 'Using CI to Beacon deploy',
          path: 'coming-soon'
        }
      ]
    },
    {
      title: 'Community',
      featured: [
        {
          title: 'How to support us',
          path: 'coming-soon'
        },
        {
          title: 'Why Open Source?',
          path: 'coming-soon'
        },
        {
          title: 'Communication',
          path: 'coming-soon'
        }
      ]
    }
  ];

  constructor(private http: HttpClient, private matDialog: MatDialog)
  { }


  readArticle(article)
  {
    this.http.get(`${this.url}/assets/help/${article.path}.md`, { responseType: 'text' }).subscribe(data => {
      article.content = data;
      this.matDialog.open(HelpArticleComponent, {
        panelClass: 'help-article-dialog',
        data: {article: article}
      });
    });
  }
}
