import { GitHubUserMapper } from './user.mapper';
import { PullRequestModel } from '../../models/index.model';

export class GitHubPullRequestMapper {
    static import(input: any): PullRequestModel {
        return {
            uid: input.id,
            url: input.url,
            state: input.state,
            title: input.title,
            owner: GitHubUserMapper.import(input.user),
            assigned: GitHubUserMapper.import(input.assigned),
            requestedReviewers: GitHubUserMapper.import(input.user),
            description: input.body,
            createdOn: input.created_at,
            updatedOn: input.updated_at,
        } as PullRequestModel;
    }
}
