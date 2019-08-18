import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^expect a "([^"]*)" request to "([^"]*)" will return "([^"]*)"$/, (verb, endpoint, response) => {
    cy.server();
    cy.fixture(response).as('responseFile');

    cy.route({
        method: verb,
        url: new RegExp(`^${endpoint.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`),
        response: '@responseFile',
        status: 200
    }).as('response');
});
