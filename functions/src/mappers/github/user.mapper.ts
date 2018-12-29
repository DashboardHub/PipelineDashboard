export class GitHubUserMapper {
    static import(input: any) {
        return {
            username: input.login,
            avatarUrl: input.avatar_url,
        };
    }
}
