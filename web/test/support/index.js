import './commands';

before(() => {
  cy.task('db:delete:collection', { collection: 'repositories' });
  cy.task('db:delete:collection', { collection: 'projects' });
  cy.task('db:delete:collection', { collection: 'users' });
  cy.task('db:delete:collection', { collection: 'userStats' });
});
