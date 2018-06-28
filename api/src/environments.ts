import * as express from 'express';

class Environments {
    public express;

    constructor() {
        this.express = express();
        this.mountHomeRoute();
    }

    private mountHomeRoute(): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World! EDDIE',
            });
        });
        this.express.use('/', router);
    }
}

export default new Environments().express;
