import { GitHubUserMapper } from './user.mapper';

export class GitHubReleaseMapper {
    static import(input: any) {
        return {
            uid: input.id,
            title: input.name,
            description: input.body,
            owner: GitHubUserMapper.import(input.author),
            createdOn: input.published_at,
        };
    }
}
