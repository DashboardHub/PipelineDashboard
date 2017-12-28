import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { List } from './../../list';
import { ActivatedRoute } from "@angular/router";
import { TdDialogService } from "@covalent/core";

import { Pinged } from "./pinged";
import { PingedService } from "./pinged.service";
import { Monitor } from "../monitor";
import { Environment } from "../../environment";

@Component({
  selector: 'app-pinged-list',
  templateUrl: './pinged-list.component.html'
})
export class PingedListComponent implements OnInit {

  pings: List<Pinged> = new List<Pinged>();
  environment: Environment;
  monitor: Monitor;

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private viewContainerRef: ViewContainerRef,
    private pingedService: PingedService
  ) {
  }

  ngOnInit() {
    this.pingedService.subscribePings()
      .subscribe(pings => {
        this.pings = pings
      });

    this.environment = this.route.snapshot.data['environment'];
    this.monitor = this.environment.monitors[0] || null;

    if (this.monitor) {
      this.pingedService.getPings(this.environment.id, this.monitor.id);
    }
  }

}
