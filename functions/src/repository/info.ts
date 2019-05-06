import { GitHubRepositoryModel } from './../mappers/github/repository.mapper';
import { GitHubReleaseInput } from './../mappers/github/release.mapper';
import { FirebaseAdmin } from './../index';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { GitHubClient } from './../client/github';
import { GitHubEventInput, GitHubRepositoryMapper, GitHubEventMapper, GitHubPullRequestMapper, GitHubPullRequestInput, GitHubReleaseMapper, GitHubRepositoryInput } from '../mappers/github/index.mapper';

interface Input {
    token: string;
    fullName: string;
}

export const getRepositoryInfo: functions.HttpsFunction = functions.https.onCall( async (input: Input, context: CallableContext) => {
    const data: [GitHubRepositoryInput, GitHubPullRequestInput[], GitHubEventInput[], GitHubReleaseInput[]] = await Promise.all([
        GitHubClient<GitHubRepositoryInput>(`/repos/${input.fullName}`, input.token),
        GitHubClient<GitHubPullRequestInput[]>(`/repos/${input.fullName}/pulls?state=open`, input.token),
        GitHubClient<GitHubEventInput[]>(`/repos/${input.fullName}/events`, input.token),
        GitHubClient<GitHubReleaseInput[]>(`/repos/${input.fullName}/releases`, input.token),
    ]);
    const mappedData: GitHubRepositoryModel = {
        ...GitHubRepositoryMapper.import(data[0], 'all'),
        pullRequests: data[1].map((pullrequest: GitHubPullRequestInput) => GitHubPullRequestMapper.import(pullrequest)),
        events: data[2].map((event: GitHubEventInput) => GitHubEventMapper.import(event)),
        releases: data[3].map((release: GitHubReleaseInput) => GitHubReleaseMapper.import(release)),
    }

    await FirebaseAdmin
            .firestore()
            .collection('repositories')
            .doc(GitHubRepositoryMapper.fullNameToUid(input.fullName))
            .set(mappedData, { merge: true });

    return
});
