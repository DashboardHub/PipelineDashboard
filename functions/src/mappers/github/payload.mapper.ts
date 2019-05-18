import { GitHubEventType } from './event.mapper';

export interface GitHubPayloadInput {
  title: string;
  action?: string;
  ref?: string;
  ref_type?: string;
  pull_request?: {
    title: string;
  };
  issue?: {
    title: string;
  };
  comment?: {
    body: string;
  };
  release?: {
    name: string;
  };
}

export interface GitHubPayloadModel {
  title: string;
  action?: string;
}

export class GitHubPayloadMapper {
  static import(
    type: GitHubEventType,
    input: GitHubPayloadInput
  ): GitHubPayloadModel {
    const output: any = {};

    switch (type) {
      case 'PullRequestEvent':
        output.title = input.pull_request.title;
        break;
      case 'IssuesEvent':
        output.title = input.issue.title;
        output.action = input.action;
        break;
      case 'IssueCommentEvent':
        output.title = input.comment.body;
        output.action = input.action;
        break;
      case 'CreateEvent':
        output.title = `${input.ref_type}: ${input.ref}`;
        break;
      case 'ReleaseEvent':
        output.title = `${input.action}: ${input.release.name}`;
        break;
      case 'WatchEvent':
        output.title = `${input.action} watching`;
        break;
      case 'PushEvent':
        output.title = `Push to ${input.ref} branch`;
        break;
    }

    return output;
  }
}
