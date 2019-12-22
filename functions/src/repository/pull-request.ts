import * as firebase from 'firebase-admin';

// Dashboard hub firebase functions models/mappers
import { FirebaseAdmin } from '../client/firebase-admin';
import { GitHubClient } from '../client/github';
import { Logger } from '../client/logger';
import { BuildTimes, GitHubPullRequestStatusInput, GitHubPullRequestStatusMapper, GitHubPullRequestStatusModel } from '../mappers/github/status.mapper';

/**
 * Return the build times for all type of context for any PR
 * @param statuses GitHubPullRequestStatusModel[]
 */
export const getPullRequestBuildTime: any = (statuses: GitHubPullRequestStatusModel[]): BuildTimes[] => {
  const contexts: string[] = statuses.map((status: GitHubPullRequestStatusModel) => status.context);
  const uniqueContexts: string[] = Array.from(new Set(contexts).values());

  const buildTimes: BuildTimes[] = [];
  uniqueContexts.map((context: string) => {
    const filteredStatus: GitHubPullRequestStatusModel[] = statuses.filter((status: GitHubPullRequestStatusModel) => status.context === context);
    if (filteredStatus.length > 0) {
      const buildTime: number = Math.floor(new Date(filteredStatus[0].updatedAt).getTime()
        - new Date(filteredStatus[filteredStatus.length - 1].updatedAt).getTime()) / 1000;
      buildTimes.push({ context: context, time: buildTime });
    }
  });
  return buildTimes;
}

/**
 * Save pull request status data in builds subcollection
 */
export const getPullRequestStatus: any = async (token: string, fullName: string, ref: string, repositoryUid: string, pullRequestUid: string): Promise<GitHubPullRequestStatusModel[]> => {
  let data: GitHubPullRequestStatusInput[];
  let mappedData: GitHubPullRequestStatusModel[];

  try {
    data = await GitHubClient<GitHubPullRequestStatusInput[]>(`/repos/${fullName}/statuses/${ref}`, token);
    mappedData = data.map((pullrequest: GitHubPullRequestStatusInput) => GitHubPullRequestStatusMapper.import(pullrequest));
    const buildTimes: BuildTimes = getPullRequestBuildTime(mappedData);

    await FirebaseAdmin
      .firestore()
      .collection(`repositories/${repositoryUid}/statuses`)
      .doc(pullRequestUid.toString())
      .set({
        latest: { commitId: ref, statuses: mappedData, buildTimes: buildTimes },
        historic: firebase.firestore.FieldValue.arrayUnion({ commitId: ref, statuses: mappedData, buildTimes: buildTimes }), // append to exist historic array
      }, { merge: true });

  } catch (error) {
    Logger.error(error, [`Pull request status path: ${fullName}/statuses/${ref}`]);
    throw new Error(error);
  }

  return mappedData;
};
