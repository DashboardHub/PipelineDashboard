Then(/^there is the field "([^"]*)" with "([^"]*)" in collection "([^"]*)"$/, (field, count, collection) => {
  FirebaseAdmin
  .firestore()
  .collection(`${collection}`)
  .doc(uid)
  .set({
    field: count
  });
});

Then(/^the count "([^"]*)" is in the element "([^"]*)"$/, (field, count) => {
 cy.get(field).contains(count);
});
