import * as app from './server';
import { createServer, proxy } from 'aws-serverless-express';

import { Context } from 'aws-lambda';

const mimeTypes: Array<string> = [
    // 'application/javascript',
    // 'application/json',
    // 'application/octet-stream',
    // 'application/xml',
    // 'font/eot',
    // 'font/opentype',
    // 'font/otf',
    // 'image/jpeg',
    // 'image/png',
    // 'image/svg+xml',
    // 'text/comma-separated-values',
    // 'text/css',
    // 'text/html',
    // 'text/javascript',
    // 'text/plain',
    // 'text/text',
    // 'text/xml'
];

const server = createServer(<any>app, undefined, mimeTypes);
exports.api = (event: any, context: Context) => proxy(server, event, context);
