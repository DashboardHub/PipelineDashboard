import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { CorsOptions } from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as passport from "passport";
import { AddressInfo } from 'net';

import * as strategy from './auth/strategy';
import { db } from './db';

import Environments from './environment/environments';
import Login from "./auth/login";
import Registration from "./auth/registration";

/*
 * Load up the App
 */
const app: express.Application = express();

/*
 * Configure security elements
 */
const corsOpts: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', Login);
app.use('/auth', Registration);
app.use('/', Environments);
app.use('/environments', passport.authenticate('jwt', { session: false }), strategy.isAuthenticated, Environments);

/*
 * Create the server
 */
const server = http.createServer(app);
const port = process.env['PORT'];

server.listen(port);
server.on('listening', listening);

async function listening() {
    await db;

    const addr = <AddressInfo>server.address();
    console.log(`Listening on ${addr.address}:${addr.port}`);
}

module.exports = app;
