import { Router } from 'express';
import { Environment } from './db/models/environment';

export class Environments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.test.bind(this));
    }

    test(req: any, res: any, next: any) {
        Environment.findAll().then((data) => {
            res.status(200).send({ data });
        });

    }
}

export default new Environments().router;
