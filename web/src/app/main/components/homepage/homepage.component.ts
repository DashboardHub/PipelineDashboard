import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { UserStatsModel } from '../../../shared/models/index.model';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'dashboard-homepage',
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

    private userSubscription: Subscription;
    public users: UserStatsModel[] = [];

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.userSubscription = this.userService
            .findUserStats()
            .subscribe((users: UserStatsModel[]) => this.users = users);
    }

    ngDestroy(): void {
        this.userSubscription
            .unsubscribe();
    }
}
