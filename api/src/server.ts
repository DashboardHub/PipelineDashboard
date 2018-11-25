import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { CorsOptions } from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import { Server } from 'http';
import { AddressInfo } from 'net';
import * as passport from 'passport';

import * as strategy from './auth/strategy';
import { db } from './db';

import { Login } from './auth/login';
import { Registration } from './auth/registration';
import { PrivateEnvironments } from './environment/private';
import { PublicEnvironments } from './environment/public';

/*
 * Load up the App
 */
const app: express.Application = express();

/*
 * Configure security elements
 */
const corsOpts: CorsOptions = {
    allowedHeaders: ['Content-Type'],
    credentials: true,
    methods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST'],
    optionsSuccessStatus: 200,
    origin: '*',
};

app.enable('trust proxy');
app.use(helmet());
app.options('*', cors(corsOpts));
app.use(cors(corsOpts));

/*
 * Auth
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * Routes
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', new Login().router);
app.use('/auth', new Registration().router);
app.use(
    '/environments',
    passport.authenticate('jwt', { session: false }), strategy.isAuthenticated,
    new PrivateEnvironments().router,
);
app.use('/', new PublicEnvironments().router);

/*
 * Create the server
 */
const server: Server = http.createServer(app);
const port: string = process.env.PORT || '3000';

server.listen(port);
server.on('listening', async () => {
    await db;

    const addr: AddressInfo = server.address() as AddressInfo;
    console.log(`Listening on ${addr.address}:${addr.port}`);
});

module.exports = app;
