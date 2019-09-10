
export const enviroment: Config = {
  githubWebhook: {
    url: 'https://{{ FIREBASE_FUNCTIONS_URL }}.cloudfunctions.net/responseGitWebhookRepository',
    secret: '{{ GITHUB_WEBHOOK_SECRET }}',
    content_type: 'json',
    insecure_ssl: '0',
    events: [
      'push',
      'pull_request',
    ],
  },

}

interface Config {
  githubWebhook: {
    url: string,
    secret: string,
    content_type: 'json' | 'form',
    insecure_ssl: '0' | '1',
    events: string[],
  }
}
