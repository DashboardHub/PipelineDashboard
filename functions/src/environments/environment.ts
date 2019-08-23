
export const enviroment: Config = {
  githubWebhook: {
    url: "https://us-central1-pipelinedashboard-dev-cfa68.cloudfunctions.net/responseGitWebhookRepository",
    events: [
      'push',
      'pull_request',
      'issues',
      'repository',
      'release',
      'milestone',
      'issue_comment',
      'create',
      'watch',
      'status',
      'member',
    ],
  },

}

interface Config {
  githubWebhook: {
    url: string,
    events: string[],
  }
}
