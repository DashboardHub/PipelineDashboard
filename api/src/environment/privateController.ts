import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Environment } from '../db/models/Environment';
import { EnvironmentService } from './environmentService';
const environmentService: EnvironmentService = new EnvironmentService();

export class PrivateEnvironments {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private findAll(req: Request, res: Response, next: NextFunction): void {
        environmentService
            .findAllPrivate(req.user.id)
            .subscribe((list: Environment[]) => res
                .status(HttpStatus.OK)
                .json({ list }));
    }

    private findOne(req: Request, res: Response, next: NextFunction): void {
        environmentService
            .findOnePrivate(req.params.id, req.user.id)
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
        this.router.post('/', this.findAll.bind(this));
        this.router.patch('/:id', this.findAll.bind(this));
    }
}
