import { LoggingWinston }  from '@google-cloud/logging-winston';
import * as winston from 'winston';

export const Logger: winston.Logger = winston.createLogger({
  // format: winston.format.combine(
  //     winston.format.timestamp(),
  //     winston.format.json()
  // ),
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new LoggingWinston(),
  ],
});
