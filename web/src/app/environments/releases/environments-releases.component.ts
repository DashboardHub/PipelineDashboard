import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Deployed } from '../../../models/deployed.model';
import { Environment } from '../../../models/environment.model';
import { List } from '../../../models/list.model';
import { Release } from '../../../models/release.model';
import { Token } from '../../../models/token.model';

import { ReleaseService } from '../../../services/release.service';

@Component({
    selector: 'dashboard-environments-releases',
    templateUrl: './environments-releases.component.html'
})
export class EnvironmentsReleasesComponent implements OnInit {

    public releases: List<Release> = new List<Release>();
    public environment: Environment;
    public releasesForm: FormGroup;
    public tokens: List<Token>;
    public tokenList: { label: string, value: string }[];
    public stateList: { label: string, value: string }[];

    constructor(
        private route: ActivatedRoute,
        private form: FormBuilder,
        private releaseService: ReleaseService
    ) { }

    refresh(): void {
        this.releaseService
            .findAllByEnvironmentId(this.environment.id)
            .subscribe((releases: List<Release>) => this.releases = releases);
    }

    ngOnInit(): void {
        this.releases = this.route.snapshot.data.releases;
        this.environment = this.route.snapshot.data.environment;
        this.tokens = this.route.snapshot.data.tokens;

        this.tokenList = this.tokens.list.map((token: Token) => ({ label: token.name, value: token.id }));

        switch (this.environment.type) {
            case 'build':
                this.stateList = [
                    { label: 'Start Build', value: 'startBuild' },
                    { label: 'Finish Build', value: 'finishBuild' }
                ];
                break;
            case 'deploy':
                this.stateList = [
                    { label: 'Start Deploy', value: 'startDeploy' },
                    { label: 'Finish Deploy', value: 'finishDeploy' }
                ];
                break;
            case 'build-deploy':
            default:
                this.stateList = [
                    { label: 'Start Build', value: 'startBuild' },
                    { label: 'Finish Build', value: 'finishBuild' },
                    { label: 'Start Deploy', value: 'startDeploy' },
                    { label: 'Finish Deploy', value: 'finishDeploy' }
                ];
                break;
        }

        this.releasesForm = this.form.group({
            version: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            token: [undefined, [Validators.required]],
            state: [undefined, [Validators.required]]
        });
    }

    submitRelease(): void {
        let deployed: Deployed = new Deployed();
        const form: any = this.releasesForm.getRawValue();

        deployed.environmentId = this.environment.id;
        deployed.release = form.version;
        deployed.state = form.state;
        deployed.token = form.token;

        this.releaseService.add(deployed).subscribe(() => this.refresh());
    }

}
