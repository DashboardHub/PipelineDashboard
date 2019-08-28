
export const enviroment: Config = {
  githubWebhook: {
    url: "https://us-central1-project-dashboard-82b78.cloudfunctions.net/responseGitWebhookRepository",
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
