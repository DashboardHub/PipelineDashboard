import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as passportLocal from 'passport-local';

import { User } from '../db/models/User';

/* tslint:disable */
const extractJWT = passportJWT.ExtractJwt;
const jWTStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user: User, done) => {
    if (user) {
        done(undefined, user.id);
    }
});

passport.deserializeUser((id: string, done) => {
    User.findById(id)
        .then((user: User | null) => {
            if (!user) {
                return done('User not found');
            }

            return done(undefined, user);
        });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email: string, password: string, done: any): void => {
        User.findOne<User>({ where: { email: email.toLowerCase() }, raw: true })
            .then((user: User | null) => {
                if (!user) {
                    return done(undefined, undefined, { message: 'User not found' });
                }

                if (!bcrypt.compareSync(password, user.hash || '')) {
                    return done(undefined, undefined, { message: `Invalid password for user "${user.id}"` });
                }

                return done(undefined, user);
            });
    }));

/**
 * Protected
 */
passport.use(
    new jWTStrategy(
    {
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'your_jwt_secret', // @TODO move to config
    },
    (req: Request, jwtPayload: any, cb: passportJWT.VerifiedCallback): any =>
        User.findOne<User>({ where: { id: jwtPayload.id } })
            .then((user: User | null) => {
                req.user = user;
                cb(null, user);
            })
            .catch((error: Error) => cb(error))
    ),
);

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }

    return next('Not authenticated');
};
