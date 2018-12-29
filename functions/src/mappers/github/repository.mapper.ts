export class GitHubRepositoryMapper {
    static fullNameToUid(fullName: string) {
        return fullName.replace('/', '+');
    }

    static import(input: any, type: 'minimum' | 'all' = 'minimum') {
        let output: any = {};

        switch(type) {
            case 'all':
                output.fork = input.fork;
            case 'minimum':
                output.uid = GitHubRepositoryMapper.fullNameToUid(input.full_name);
                output.fullName = input.full_name;
                output.description = input.description;
                output.private = input.private;
        }

        return output;
    }
}
