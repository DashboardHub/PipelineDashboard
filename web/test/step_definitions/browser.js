import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'http://localhost:4200';

Given(/^the "([^"]*)" page is open$/, (path) => {
    cy.visit(`${url}/${path}`);
});

Then(/^the title on the page says "([^"]*)"$/, (text) => {
  cy.title().should('include', text);
});

Then(/^the text "([^"]*)" is in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).contains(text);
});

