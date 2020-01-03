import {
  Given,
  Then
} from 'cypress-cucumber-preprocessor/steps';

const url = Cypress.config('baseUrl');

Given(/^the "([^"]*)" page is open$/, (path) => {
  cy.visit(`${url}/${path}`);
});

Then(/^the title on the page says "([^"]*)"$/, (text) => {
  cy.title().should('include', text);
});

Then(/^the text "([^"]*)" is in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).contains(text);
});

When(/^find the row of text "([^"]*)"$/, (text) => {
  cy.contains('tr', text).as('row');
});

Then(/^the text "([^"]*)" is in the row and column "([^"]*)"$/, (text, column) => {
  cy.get('@row').get(column).contains(text);
});

Then(/^the text "([^"]*)" is not in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).contains(text).should('not.exist')
});
