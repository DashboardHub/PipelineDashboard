import { Injectable } from '@angular/core';
import { FuseNavigationService } from "../core/components/navigation/navigation.service";
import { FuseNavigationModel } from "./navigation.model";

@Injectable()
export class NavigationService {

  constructor(private navigationService: FuseNavigationService, private navigationModel: FuseNavigationModel) {

  }

  addPrivate(): void {
    if (this.navigationService.getNavigationItem('private').children.length === 0) {
      this.navigationModel.private.map((item) => this.navigationService.addNavigationItem('private', item))
    }
    if (this.navigationService.getNavigationItem('account').children.length === 0) {
      this.navigationModel.account.map((item) => this.navigationService.addNavigationItem('account', item))
    }
  }

  removePrivate(): void {
    this.navigationService.getNavigationItem('private').children = [];
    this.navigationService.getNavigationItem('account').children = [];
  }
}
