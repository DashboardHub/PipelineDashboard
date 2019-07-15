// Third party modules
import * as CORS from 'cors';
import { RequestHandler, Response } from 'express';
// import { firestore } from 'firebase-admin';
import { https, HttpsFunction } from 'firebase-functions';

const cors: RequestHandler = CORS({
  origin: true,
});

export interface ResponseGitWebhookRepositoryInput {
  token: string;
  repositoryUid: string;
}

export const onResponseGitWebhookRepository: HttpsFunction = https.onRequest((req: https.Request, res: Response) => {
  return cors(req, res, () => {
    console.log(`${req.protocol}://${req.hostname} ; onResponseGitWebhookRepository: success!`);
    res.status(200).send();
  });
});
