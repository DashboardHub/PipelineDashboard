
export const enviroment: Config = {
  githubWebhook: {
    url: "https://us-central1-pipelinedashboard-dev-cfa68.cloudfunctions.ne/responseGitWebhookRepository",
  },

}

interface Config {
  githubWebhook: {
    url: string,
  }
}
