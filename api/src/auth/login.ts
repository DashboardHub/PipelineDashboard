import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';

import User from '../db/models/user';

export class Login {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/login', this.action.bind(this));
    }

    private action(req: any, res: any, next: any) {
        passport.authenticate('local', { session: false },  (authErr: Error, user: User, info: IVerifyOptions) => {
            if (authErr || !user) {
                res
                    .status(400)
                    .json({ error: 'Authentication failed', info: info.message.toString() });
            }

            req.login(user, { session: false }, (loginErr: Error) => {
                if (loginErr) { return next(loginErr); }
                const token = jwt.sign(user, 'your_jwt_secret');
                return res.json({ user, token });
            });

        })(req, res, next);
    }
}

export default new Login().router;
