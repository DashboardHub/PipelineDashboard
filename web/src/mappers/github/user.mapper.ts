import { UserModel } from '../../models/index.model';

export class GitHubUserMapper {
    static import(input: any): UserModel {
        return {
            uid: input.id,
            username: input.login,
            avatarUrl: input.avatar_url,
            url: input.url
        };
    }
}
