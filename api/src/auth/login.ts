import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';

import { User } from '../db/models/User';

export class Login {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private action(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('local', { session: false }, (authError: Error, user: User, info: IVerifyOptions) => {
            if (authError || !user) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ error: 'Authentication failed' });
            }

            return req.login(user, { session: false }, (loginError: Error) => {
                if (loginError) {
                    return next(loginError);
                }

                return res.json({ token: jwt.sign(user, 'your_jwt_secret') }); // @TODO move to config
            });

        })(req, res, next);
    }

    private registerRoutes(): void {
        this.router.post('/login', this.action.bind(this));
    }
}
