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
        this.router.get('/:id', this.findOne.bind(this));
    }

    private findAll(req: any, res: any, next: any) {
        Environment
            .findAll<Environment>()
            .then((list) => {
                res
                    .status(200)
                    .json({ list });
            });
    }

    private findOne(req: any, res: any, next: any) {
        Environment
            .findOne<Environment>({ attributes: ['id', 'description'], where: { id: req.params.id } })
            .then((environment) => {
                res
                    .status(200)
                    .json({ environment });
            });
    }
}

export default new PublicEnvironments().router;
