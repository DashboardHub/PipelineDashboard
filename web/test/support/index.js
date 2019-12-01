import './commands';

before(() => {
  cy.task('db:delete', { collection: 'projects' })
  cy.task('db:delete', { collection: 'users' })
  cy.task('db:delete', { collection: 'userStats' })
});
