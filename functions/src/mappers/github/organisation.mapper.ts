export class GitHubOrganisationMapper {
    static import(input: any) {
        return {
            username: input.login,
            avatarUrl: input.avatar_url,
        };
    }
}
