import { Router } from 'express';
import { Environment } from '../db/models/environment';

export class PublicEnvironments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/', this.list.bind(this));
        this.router.get('/:id', this.list.bind(this));
    }

    private list(req: any, res: any, next: any) {
        Environment
            .findAll<Environment>()
            .then((list) => {
                res
                    .status(200)
                    .json({ list });
            });
    }
}

export default new PublicEnvironments().router;
