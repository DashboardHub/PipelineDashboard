// Third party modules
import * as CORS from 'cors';
import { https, HttpsFunction, Response } from 'firebase-functions';
import { GitHubClient } from '../client/github';
import { Logger } from '../client/logger';
import { GitHubContributorInput, GitHubContributorMapper } from '../mappers/github/index.mapper';
import {
  CreateEventModel,
  IssuesEventModel,
  IssueCommentEventModel,
  MemberEventModel,
  MilestoneEventModel,
  PullRequestEventModel,
  PushEventModel,
  ReleaseEventModel,
  RepositoryEventModel,
  StatusEventModel,
  WatchEventModel,
} from '../mappers/github/webhook-event-response';
import { addHubEventToCollection, HubEventActions } from '../mappers/github/webhook-event-response/shared';
import { RepositoryModel } from '../models/index.model';
import { DocumentData } from './../client/firebase-admin';

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
    let result: Promise<any>;

    Logger.info(req.body);
    Logger.info(Object.keys(inputData));

    if (IssueCommentEventModel.isCurrentModel(inputData)) {

      result = issueCommentEvent(new IssueCommentEventModel(inputData));

    } else if (IssuesEventModel.isCurrentModel(inputData)) {

      result = issuesEvent(new IssuesEventModel(inputData));

    } else if (CreateEventModel.isCurrentModel(inputData)) {

      result = createEvent(new CreateEventModel(inputData));

    } else if (PushEventModel.isCurrentModel(inputData)) {

      result = pushEvent(new PushEventModel(inputData));

    } else if (PullRequestEventModel.isCurrentModel(inputData)) {

      result = pullRequestEvent(new PullRequestEventModel(inputData));

    } else if (ReleaseEventModel.isCurrentModel(inputData)) {

      result = releaseEvent(new ReleaseEventModel(inputData));

    } else if (MilestoneEventModel.isCurrentModel(inputData)) {

      result = milestoneEvent(new MilestoneEventModel(inputData));

    } else if (WatchEventModel.isCurrentModel(inputData)) {

      result = watchEvent(new WatchEventModel(inputData));

    } else if (RepositoryEventModel.isCurrentModel(inputData)) {

      result = repositoryEvent(new RepositoryEventModel(inputData));

    } else if (MemberEventModel.isCurrentModel(inputData)) {

      result = memberEvent(new MemberEventModel(inputData));

    } else if (StatusEventModel.isCurrentModel(inputData)) {

      result = statusEvent(new StatusEventModel(inputData));

    } else {
      Logger.error('Not found parser for event');
    }

    if (result) {
      result
        .then(() => {
          Logger.info('Parsing done!');
          res.status(200).send();
        })
        .catch((err: any) => {
          Logger.error('Parser error!');
          Logger.error(err);
          res.status(500).send('Parser error!');
        });
    } else {
      // res.status(200).send();
      res.status(200).send('Not found parser for event');
    }

  });
});

async function simpleHubEvent(data: HubEventActions): Promise<void> {
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  addHubEventToCollection(repository, data);
  await RepositoryModel.saveRepository(repository);
}

async function issuesEvent(data: IssuesEventModel): Promise<void> {
  Logger.info('issuesEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  data.updateData(repository);

  addHubEventToCollection(repository, data);
  await RepositoryModel.saveRepository(repository);
}

async function repositoryEvent(data: RepositoryEventModel): Promise<void> {
  Logger.info('repositoryEvent');
  // const repository: DocumentData = await getRepository(data.repository.full_name);

  // TODO add parse

  // await saveRepository(repository);
}

async function pullRequestEvent(data: PullRequestEventModel): Promise<void> {
  Logger.info('pullRequestEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  data.updateData(repository);

  addHubEventToCollection(repository, data);
  await RepositoryModel.saveRepository(repository);
}

async function releaseEvent(data: ReleaseEventModel): Promise<void> {
  Logger.info('releaseEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  data.updateData(repository);

  addHubEventToCollection(repository, data);
  await RepositoryModel.saveRepository(repository);
}

async function milestoneEvent(data: MilestoneEventModel): Promise<void> {
  Logger.info('milestoneEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  data.updateData(repository);

  await RepositoryModel.saveRepository(repository);
}

async function watchEvent(data: WatchEventModel): Promise<void> {
  Logger.info('watchEvent');
  await simpleHubEvent(data);
}

async function pushEvent(data: PushEventModel): Promise<void> {
  Logger.info('pushEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  addHubEventToCollection(repository, data);
  await updateContributors(repository);

  await RepositoryModel.saveRepository(repository);
}

async function issueCommentEvent(data: IssueCommentEventModel): Promise<void> {
  Logger.info('issueCommentEvent');
  await simpleHubEvent(data);
}

async function createEvent(data: CreateEventModel): Promise<void> {
  Logger.info('createEvent');
  await simpleHubEvent(data);
}

async function memberEvent(data: MemberEventModel): Promise<void> {
  Logger.info('memberEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  await updateContributors(repository);

  await RepositoryModel.saveRepository(repository);
}

async function statusEvent(data: StatusEventModel): Promise<void> {
  Logger.info('statusEvent');
  const repository: DocumentData = await RepositoryModel.getRepositoryByFullName(data.repository.full_name);

  await updateContributors(repository);

  await RepositoryModel.saveRepository(repository);
}

async function updateContributors(repository: DocumentData): Promise<void> {
  // TODO return is empty obj
  const response: GitHubContributorInput[] = await GitHubClient<GitHubContributorInput[]>(`/repos/${repository.fullName}/stats/contributors`);
  repository.contributors = Array.isArray(response) ? response.map((contributor: GitHubContributorInput) => GitHubContributorMapper.import(contributor)) : [];
}
