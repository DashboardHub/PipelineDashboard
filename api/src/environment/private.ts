import { Router } from 'express';
import { Environment } from '../db/models/environment';

export class PrivateEnvironments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/', this.findAll.bind(this));
        this.router.get('/:id', this.findOne.bind(this));
        this.router.post('/', this.findAll.bind(this));
        this.router.patch('/:id', this.findAll.bind(this));
    }

    private findAll(req: any, res: any, next: any) {
        Environment
            .findAll<Environment>({ where: { ownerId: req.user.id } })
            .then((list) => {
                res
                    .status(200)
                    .json({ list });
            });
    }

    private findOne(req: any, res: any, next: any) {
        Environment
            .findOne<Environment>({ where: { id: req.params.id, ownerId: req.user.id } })
            .then((environment) => {
                res
                    .status(200)
                    .json({ environment });
            });
    }
}

export default new PrivateEnvironments().router;
