import { Router } from 'express';

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
        res.status(200).send({ message: 'hello world!' });
    }
}

export default new Environments().router;
