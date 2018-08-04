import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';

import User from '../db/models/user';
import AuditService from './auditService';

export class Registration {

    public router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/registration', this.action.bind(this));
    }

    private action(req: Request, res: Response, next: NextFunction): Response | void {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: 'Registration failed' });
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(password)) {
            return res
                .status(400)
                .json({
                    error: `Password must be / have:
                            minimum eight characters, at least one uppercase letter,
                            one lowercase letter, one number and one special character`,
                });
        }

        User.findOne<User>({ where: { email: email.toLowerCase() }, raw: true })
            .then((user: User | null) => {
                if (user) {
                    return AuditService.create(req, {
                        details: `User "${user.email}" already exists`,
                        namespace: 'auth',
                        type: 'registration',
                        userId: user.id,
                    }).then(() => res
                        .status(400)
                        .json({ error: 'Registration failed' }));
                }

                const data = {
                    email,
                    hash: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
                };

                return User.create(data)
                           .then((newUser: User) => AuditService
                               .create(req, {
                                   details: `User "${newUser.email}" registered`,
                                   namespace: 'auth',
                                   type: 'registration',
                                   userId: newUser.id,
                               })
                               .then(() => newUser))
                           .then((newUser: User) => res
                               .status(200)
                               .json({ id: newUser.id, email: newUser.email }));
            })
            .catch(() => res
                .status(400)
                .json({ error: 'Registration failed' }));
    }
}

export default new Registration().router;
