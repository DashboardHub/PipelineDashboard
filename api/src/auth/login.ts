import { NextFunction, Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';

import User from '../db/models/user';
import AuditService from './auditService';

export class Login {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/login', this.action.bind(this));
    }

    private action(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('local', { session: false }, (authError: Error, user: User, info: IVerifyOptions) => {
            if (authError || !user) {
                AuditService.create(req, {
                    details: `Login failed: ${info.message}`,
                    namespace: 'auth',
                    type: 'login',
                    userId: user.id,
                });

                return res
                    .status(400)
                    .json({ error: 'Authentication failed' });
            }

            return req.login(user, { session: false }, (loginError: Error) => {
                if (loginError) {
                    return next(loginError);
                }

                AuditService.create(req, {
                    details: 'Login successful',
                    namespace: 'auth',
                    type: 'login',
                    userId: user.id,
                });

                const token = jwt.sign(user, 'your_jwt_secret');
                return res.json({ token });
            });

        })(req, res, next);
    }
}

export default new Login().router;
