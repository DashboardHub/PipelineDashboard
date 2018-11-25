import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Environment } from '../db/models/Environment';

export class PrivateEnvironments {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private findAll(req: Request, res: Response, next: NextFunction): void {
        Environment
            .findAll<Environment>({ where: { ownerId: req.user.id } })
            .then((list: Environment[]) => res
                    .status(HttpStatus.OK)
                    .json({ list }));
    }

    private findOne(req: Request, res: Response, next: NextFunction): void {
        Environment
            .findOne<Environment>({ where: { id: req.params.id, ownerId: req.user.id } })
            .then((environment: Environment | null) => res
                    .status(HttpStatus.OK)
                    .json({ environment }));
    }

    private registerRoutes(): void {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findOne.bind(this));
        this.router.post('/', this.findAll.bind(this));
        this.router.patch('/:id', this.findAll.bind(this));
    }
}
