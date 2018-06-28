import * as express from 'express';
import { Application, Request, Response} from 'express';

class Environments {
    public express: Application;

    constructor() {
        this.express = express();
        this.mountHomeRoute();
    }

    private mountHomeRoute(): void {
        const router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.json({
                message: 'Hello World!',
            });
        });
        this.express.use('/', router);
    }
}

export default new Environments().express;
