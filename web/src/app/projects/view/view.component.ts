import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from '../../../services/project.service';
import { catchError } from 'rxjs/operators';
import { ProjectModel } from '../../../models/index.model';

@Component({
    selector: 'dashboard-projects-view',
    templateUrl: './view.component.html',
})
export class ViewProjectComponent implements OnInit {

    public project: ProjectModel = new ProjectModel();

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
    ) {
        this.project.uid = this.route.snapshot.paramMap.get('uid');
    }

    ngOnInit(): void {
        this.projectService
            .findOneById(this.project.uid)
            .subscribe((project: ProjectModel) => this.project = project);
    }
}
