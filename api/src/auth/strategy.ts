import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as passportLocal from 'passport-local';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy  = passportJWT.Strategy;

import User from '../db/models/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    if (user) {
        done(undefined, user.id);
    }

    // done(null, '');
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
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
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
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'your_jwt_secret', // @TODO move to config
    },
    (req: Request, jwtPayload: any, cb: passportJWT.VerifiedCallback) => {

        return User.findOne<User>({ where: { id: jwtPayload.id }})
            .then((user: User | null) => {
                req.user = user;
                cb(null, user);
            })
            .catch((error: Error) => cb(error));
    },
));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return next('Not authenticated');
};
