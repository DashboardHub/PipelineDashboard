import { Component } from '@angular/core';

import { TdDigitsPipe } from '@covalent/core/common';

import { multi } from './data';

@Component({
  selector: 'qs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  environments: Object[] = [
    {
      logo: 'account_circle',
      title: 'Environment A',
      description: 'Description of Environment A',
      updatedAt: '07/13/2016 11:05 AM',
    },
    {
      logo: 'account_circle',
      title: 'Environment B',
      description: 'Description of Environment B',
      updatedAt: '07/13/2016 11:05 AM',
    },
    {
      logo: 'account_circle',
      title: 'Environment C',
      description: 'Description of Environment C',
      updatedAt: '07/13/2016 11:05 AM',
    },
    {
      logo: 'account_circle',
      title: 'Environment',
      description: 'Description of Environment D',
      updatedAt: '07/13/2016 11:05 AM',
    },
  ];
  multi: any[];
  view: any[] = [700, 400];

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  constructor() {
    // Chart
    this.multi = multi.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
