exports.data = {
  uid: 'test-repository-full',
  projects: ['test-project-public-repository-full'],
  url: 'https://api.github.com/repos/DashboardHub/PipelineDashboard',
  fullName: 'DashboardHub/PipelineDashboard',
  private: false,
  issues: [{
    title: 'test-issue',
    createdOn: 'DATETIME[NOW]',
    updatedOn: 'DATETIME[NOW]',
    owner: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
  }],
  releases: [{
    title: 'test-release',
    isPrerelease: false,
    owner: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
    createdOn: 'DATETIME[NOW]',
  }],
  milestones: [{
    title: 'test-milestone',
    state: 'open',
    creator: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
    updatedAt: 'DATETIME[NOW]'
  }],
  contributors: [{
    owner: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
    total: 2
  }],
  pullRequests: [{
    title: 'test-PR',
    owner: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
    createdOn: 'DATETIME[NOW]',
  }],
  events: [{
    payload: {
      title: 'test-event',
      action: 'created'
    },
    createdOn: 'DATETIME[NOW]',
    public: true,
    type: 'IssueCommentEvent',
    actor: {
      avatarUrl: 'https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png',
      username: 'test-user-minimum'
    },
  }],
  createdOn: 'DATETIME[NOW]',
}
