import { Router } from 'express';
// import { Environment } from '../db/models/environment';

export class Environments {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/', this.list.bind(this));
        this.router.get('/:id', this.list.bind(this));
        this.router.post('/', this.list.bind(this));
        this.router.patch('/:id', this.list.bind(this));
    }

    private list(req: any, res: any, next: any) {
        console.log('---------------');
        console.log(req.user);
        // Environment.findAll<Environment>({ where: { ownerId: req.user.id } }).then((data) => {
        //     res
        //         .status(200)
        //         .json({ data });
        // });

        res
            .status(200)
            .json({ test: 'hello' });

    }
}

export default new Environments().router;
