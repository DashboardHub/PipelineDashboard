import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Environment } from '../db/models/Environment';

export class PublicEnvironments {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private findAll(req: Request, res: Response, next: NextFunction): void {
        Environment
            .findAll<Environment>({
                attributes: ['id', 'name', 'description', 'logo', 'type', 'url', 'pings', 'views'],
                where: { isPrivate: false },
            })
            .then((list: Environment[]) => res
                    .status(HttpStatus.OK)
                    .json({ list }));
    }

    private findOne(req: Request, res: Response, next: NextFunction): void {
        Environment
            .findOne<Environment>({
                attributes: ['id', 'name', 'description', 'logo', 'type', 'url', 'pings', 'views'],
                where: { id: req.params.id },
            })
            .then((environment: Environment | null) => res
                    .status(HttpStatus.OK)
                    .json({ environment }));
    }

    private registerRoutes(): void {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findOne.bind(this));
    }
}
