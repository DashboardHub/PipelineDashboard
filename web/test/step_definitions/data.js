Given(/^there is a document "([^"]*)" with the field "([^"]*)" set to (\d+) in collection "([^"]*)"$/, (id, field, value, collection) => {
  cy.task('db:update', { collection, id, field, value })
});

Then(/^the count (\d+) is in the element "([^"]*)"$/, (count, field) => {
  cy.get(field).contains(count);
});

Then(/^there is a document "([^"]*)" with the js "([^"]*)" in collection "([^"]*)"$/, (uid, js, collection) => {
  cy.fixture(js).then((data) => cy.task('db:save', { collection, uid, data }));
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
