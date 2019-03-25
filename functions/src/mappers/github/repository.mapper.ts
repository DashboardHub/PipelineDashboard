export class GitHubRepositoryMapper {
    static fullNameToUid(fullName: string) {
        return fullName.replace('/', '+');
    }

    static import(input: any, type: 'minimum' | 'all' | 'event' = 'minimum') {
        const output: any = {};

        switch(type) {
            case 'all':
                output.fork = input.fork;
                break;
            case 'event':
                output.id = input.id;
                output.fullName = input.name;
                output.url = input.url;
                break;
            case 'minimum':
                output.uid = GitHubRepositoryMapper.fullNameToUid(input.full_name);
                output.fullName = input.full_name;
                output.description = input.description;
                output.private = input.private;
                break;
        }

        return output;
    }
}
