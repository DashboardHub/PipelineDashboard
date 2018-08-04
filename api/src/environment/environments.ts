import { Router } from 'express';
import { Environment } from '../db/models/environment';

export class Environments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/', this.test.bind(this));
    }

    private test(req: any, res: any, next: any) {
        Environment.findAll<Environment>().then((data) => {
            res
                .status(200)
                .json({ data });
        });

    }
}

export default new Environments().router;
