
export const enviroment: Config = {
  githubWebhook: {
    url: 'https://{{ FIREBASE_FUNCTIONS_URL }}.cloudfunctions.net/responseGitWebhookRepository',
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
