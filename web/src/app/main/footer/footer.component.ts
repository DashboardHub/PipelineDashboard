import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'fuse-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FuseFooterComponent implements OnInit {


  version: string;

  constructor() {
    this.version = environment.version;
  }

  ngOnInit() {
  }

}
