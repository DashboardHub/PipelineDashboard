import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Dashboard hub model and services
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserStatsModel } from '../../../shared/models/index.model';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'dashboard-homepage',
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

    private userSubscription: Subscription;
    public users: UserStatsModel[] = [];
    public title: string = 'Public Projects';

    constructor(
        private userService: UserService,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.authService.setProgressBar(true);
        this.userSubscription = this.userService
            .findUserStats()
            .subscribe((users: UserStatsModel[]) => {
                this.users = users;
                this.authService.setProgressBar(false);
            });
    }

    ngDestroy(): void {
        this.userSubscription
            .unsubscribe();
    }
}
