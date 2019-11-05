
export const enviroment: Config = {
  githubWebhook: {
    url: 'https://{{ FIREBASE_FUNCTIONS_URL }}.cloudfunctions.net/responseGitWebhookRepository',
    secret: '{{ GITHUB_WEBHOOK_SECRET }}',
    content_type: 'json',
    insecure_ssl: '0',
    events: [
      // IMPLEMENTED
      'create',
      'issue_comment',
      'issues',
      'member',
      'milestone',
      'pull_request',
      'push',
      'release',
      'repository',
      'status',
      'watch',

      // NOT IMPLEMENTED
      'check_run',
      'check_suite',
      'commit_comment',
      'delete',
      'deploy_key',
      'deployment',
      'deployment_status',
      'fork',
      'gollum',
      'label',
      'meta',
      'page_build',
      'project_card',
      'project_column',
      'project',
      'public',
      'pull_request_review',
      'pull_request_review_comment',
      'registry_package',
      'repository_import',
      'repository_vulnerability_alert',
      'star',
      'team_add',

      // NOT ALLOW for this hook
      // 'content_reference',
      // 'github_app_authorization',
      // 'installation',
      // 'installation_repositories',
      // 'marketplace_purchase',
      // 'membership',
      // 'organization',
      // 'org_block',
      // 'repository_dispatch',
      // 'security_advisory',
      // 'team',
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
