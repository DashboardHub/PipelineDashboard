Then(/^there is a document "([^"]*)" with the field "([^"]*)" set to "([^"]*)" in collection "([^"]*)"$/, (id, field, value, collection) => {
  cy.task('db:update', { collection, id, field, value })
});

Then(/^the count "([^"]*)" is in the element "([^"]*)"$/, (field, count) => {
  cy.get(field).should('include', count);
});
