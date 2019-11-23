import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

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

Then(/^the text "([^"]*)" is not in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).contains(text).should('not.exist')
});

Then(/^wait for (\d+) milliseconds$/, (time) => {
  cy.wait(time)
});


