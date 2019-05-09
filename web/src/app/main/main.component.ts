import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service';

@Component({
    selector: 'dashboard-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public showSpinner: boolean = true;

    constructor(
        private spinnerService: SpinnerService
    ) { }

    ngOnInit(): void {
        this.spinnerService
            .getProgressBar()
            .subscribe((data: boolean) => this.showSpinner = data);
    }
}
