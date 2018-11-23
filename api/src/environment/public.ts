import { Router } from 'express';

import { Environment } from '../db/models/environment';

export class PublicEnvironments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findAll.bind(this));
    }

    private findAll(req: any, res: any, next: any) {
        Environment
            .findAll<Environment>({ attributes: ['id', 'description'], where: { isPrivate: false }})
            .then((list: Environment[]) => {
                res
                    .status(200)
                    .json({ list });
            });
    }
}

export default new PublicEnvironments().router;
