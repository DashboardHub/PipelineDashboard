import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Environment } from '../db/models/environment';
import { EnvironmentService } from './environmentService';
const environmentService: EnvironmentService = new EnvironmentService();

export class PublicEnvironments {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private findAll(req: Request, res: Response, next: NextFunction): void {
        environmentService
            .findAllPublic()
            .subscribe((list: Environment[]) => res
                .status(HttpStatus.OK)
                .json({ list }));
    }

    private findOne(req: Request, res: Response, next: NextFunction): void {
        environmentService
            .findOnePublic(req.params.id)
            .subscribe((environment: Environment | null) => {
                if (environment) {
                    return res
                        .status(HttpStatus.OK)
                        .json({ environment });
                }

                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ environment });
            });
    }

    private registerRoutes(): void {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findOne.bind(this));
    }
}
