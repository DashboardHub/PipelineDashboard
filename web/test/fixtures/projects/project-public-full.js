exports.data = {
  uid: 'test-project-public-full',
  type: 'public',
  title: 'Test public project with full data title',
  description: 'Test public project with full data description',
  url: 'https://www.pipelinedashboard.io',
  repositories: [ 'test-repository-minimum'],
  monitors: [{
    uid: 'test-monitor',
    name: 'test monitor',
    method: 'GET',
    path: '/',
    expectedCode: 200,
    expectedText: '',
    successfulPings: 0,
    unsuccessfulPings: 0
  }],
  pings: [],
  tokens: [],
  views: 1,
  access: {
    admin: [ 'test-user-minimum' ]
  }
}
