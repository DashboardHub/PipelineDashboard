import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(/^the "([^"]*)" link at position (\d+) is clicked$/, (link, position) => {
  cy.get(link).eq(position).click();
});

When(/^enter text "([^"]*)" in the element "([^"]*)"$/, (text, element) => {
  cy.get(element).type(text);
});

Then(/^clear text in the element "([^"]*)"$/, (element) => {
  cy.get(element).clear();
});
