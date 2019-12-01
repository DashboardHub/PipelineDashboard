import './commands';

before(() => {
  cy.task('db:delete', {collection: 'projects', subCollection: 'pings'})
  cy.task('db:delete', {collection: 'repositories', subCollection: 'statuses'})
  cy.task('db:delete', { collection:'repositories' });
  cy.task('db:delete', { collection:'projects' })
  cy.task('db:delete', { collection:'users' })
  cy.task('db:delete', { collection:'userStats' })
});
