// Third party modules
import * as CORS from 'cors';
import * as crypto from "crypto";
import { https, HttpsFunction, Response } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { Logger } from '../client/logger';
import { enviroment } from '../environments/environment';

// tslint:disable-next-line: typedef
const cors = CORS({
  origin: true,
});

export interface ResponseGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onResponseGitWebhookRepository: HttpsFunction = https.onRequest((req: https.Request, res: Response) => {
  return cors(req, res, () => {
    const sig: string = 'sha1=' + crypto.createHmac('sha1', enviroment.githubWebhook.secret).update(req.rawBody).digest('hex');

    if (sig !== req.headers['x-hub-signature']) {
      res.status(401).send('Error secret token!');
      return;
    }

    Logger.info(`${req.protocol}://${req.hostname} ; onResponseGitWebhookRepository: success!`);
    res.status(200).send();
  });
});
