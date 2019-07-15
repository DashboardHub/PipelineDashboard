
export const enviroment: Config = {
  githubWebhook: {
    url: "https://us-central1-pipelinedashboard-dev-cfa68.cloudfunctions.net/responseGitWebhookRepository",
    events: [
      'push',
      'pull_request',
    ],
  },

}

interface Config {
  githubWebhook: {
    url: string,
    events: string[],
  }
}
