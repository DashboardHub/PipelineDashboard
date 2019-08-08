// Third party modules
import * as CORS from 'cors';
// import { firestore } from 'firebase-admin';
import { https, HttpsFunction, Response } from 'firebase-functions';
import { Logger } from '../client/logger';
import {
  CreateEventModel,
  IssuesEventModel,
  IssueCommentEventModel,
  MilestoneEventModel,
  PullRequestEventModel,
  PushEventModel,
  ReleaseEventModel,
  RepositoryEventModel,
  WatchEventModel,
} from '../mappers/github/webhook-event-response';

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

    const inputData: any = req.body;

    Logger.info(req.body);
    Logger.info(Object.keys(inputData));

    if (IssueCommentEventModel.isCurrentModel(inputData)) {

      issueCommentEvent(new IssueCommentEventModel(inputData));

    } else if (IssuesEventModel.isCurrentModel(inputData)) {

      issuesEvent(new IssuesEventModel(inputData));

    } else if (CreateEventModel.isCurrentModel(inputData)) {

      createEvent(new CreateEventModel(inputData));

    } else if (PushEventModel.isCurrentModel(inputData)) {

      pushEvent(new PushEventModel(inputData));

    } else if (PullRequestEventModel.isCurrentModel(inputData)) {

      pullRequestEvent(new PullRequestEventModel(inputData));

    } else if (ReleaseEventModel.isCurrentModel(inputData)) {

      releaseEvent(new ReleaseEventModel(inputData));

    } else if (MilestoneEventModel.isCurrentModel(inputData)) {

      milestoneEvent(new MilestoneEventModel(inputData));

    } else if (WatchEventModel.isCurrentModel(inputData)) {

      watchEvent(new WatchEventModel(inputData));

    } else if (RepositoryEventModel.isCurrentModel(inputData)) {

      repositoryEvent(new RepositoryEventModel(inputData));

    } else {
      Logger.error('Not found parser for event');
    }

    res.status(200).send();
  });
});


function issuesEvent(data: any): void {
  Logger.info('issuesEvent');
}

function repositoryEvent(data: any): void {
  Logger.info('repositoryEvent');
}

function pullRequestEvent(data: any): void {
  Logger.info('pullRequestEvent');
}

function releaseEvent(data: any): void {
  Logger.info('releaseEvent');
}

function milestoneEvent(data: any): void {
  Logger.info('milestoneEvent');
}

function watchEvent(data: any): void {
  Logger.info('watchEvent');
}

function pushEvent(data: any): void {
  Logger.info('pushEvent');
}

function issueCommentEvent(data: any): void {
  Logger.info('issueCommentEvent');
}

function createEvent(data: any): void {
  Logger.info('createEvent');
}
