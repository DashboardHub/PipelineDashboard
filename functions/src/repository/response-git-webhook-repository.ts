// Third party modules
import * as CORS from 'cors';
import { https, HttpsFunction, Response } from 'firebase-functions';

import { Logger } from '../client/logger';

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
    Logger.info(`${req.protocol}://${req.hostname} ; onResponseGitWebhookRepository: success!`);
    res.status(200).send();
  });
});
