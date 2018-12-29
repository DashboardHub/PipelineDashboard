import { GitHubUserMapper } from './user.mapper';

export class GitHubPullRequestMapper {
    static import(input: any) {
        return {
            uid: input.id,
            url: input.url,
            state: input.state,
            title: input.title,
            description: input.body,
            owner: GitHubUserMapper.import(input.user),
            assignees: input.assignees.map((assignee) => GitHubUserMapper.import(assignee)),
            reviewers: input.requested_reviewers.map((reviewer) => GitHubUserMapper.import(reviewer)),
            createdOn: input.created_at,
            updatedOn: input.updated_at,
        };
    }
}
