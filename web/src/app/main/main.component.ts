import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
    selector: 'dashboard-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public showSpinner: boolean = true;

    constructor(
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authService.getProgressBar().subscribe((data: boolean) => {
            this.showSpinner = data;
        });
    }
}
