import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^the "([^"]*)" link at position (\d+) is clicked$/, (link, position) => {
  cy.get(link).eq(position).click();
});

Then(/^enter text "([^"]*)" in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).type(text);
});

Then(/^clear text in the element "([^"]*)"$/, (element) => {
  cy.get(element).clear();
});
