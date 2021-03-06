Given(/^there is a document "([^"]*)" with the field "([^"]*)" set to (\d+) in collection "([^"]*)"$/, (id, field, value, collection) => {
  cy.task('db:update', { collection, id, field, value })
});

Then(/^the count "([^"]*)" is in the element "([^"]*)"$/, (count, field) => {
  cy.get(field).contains(count);
});

Then(/^total count of element "([^"]*)" is (\d+)$/, (field, count) => {
  cy.get(field).should('have.length', count);
});

Given(/^there is the following document in the collection "([^"]*)":$/, (collection, table) => {
  const data = {};
  table.hashes().forEach((item) => {
    try {
      data[item.field] = JSON.parse(item.value);
    } catch(e) { console.log(e) }
  });
  cy.task('db:save', { collection, uid: data.uid, data });
});
