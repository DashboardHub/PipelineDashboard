import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import { config, stage } from '../../config';

import { User } from '../db/models/user';

export class Registration {

    public router: Router;

    public constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private action(req: Request, res: Response, next: NextFunction): Response | void {
        const email: string = req.body.email;
        const password: string = req.body.password;

        if (!email || !password) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ error: 'Registration failed' });
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(password)) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({
                    error: `Password must be / have:
                            minimum eight characters, at least one uppercase letter,
                            one lowercase letter, one number and one special character`,
                });
        }

        User.findOne<User>({ where: { email: email.toLowerCase() }, raw: true })
            .then((user: User | null) => {
                if (user) {
                    res
                        .status(HttpStatus.BAD_REQUEST)
                        .json({ error: 'Registration failed' });
                }

                return User.create({ email, hash: bcrypt.hashSync(password, bcrypt.genSaltSync(config[stage].salt)) })
                    .then((newUser: User) => res
                        .status(HttpStatus.OK)
                        .json({ id: newUser.id, email: newUser.email }));
            })
            .catch(() => res
                .status(HttpStatus.BAD_REQUEST)
                .json({ error: 'Registration failed' }));
    }

    private registerRoutes(): void {
        this.router.post('/registration', this.action.bind(this));
    }
}
