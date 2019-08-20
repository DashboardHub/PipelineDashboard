import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^expect a single "([^"]*)" request to "([^"]*)" will return "([^"]*)"$/, (verb, endpoint, response) => {
    cy.server();
    cy.fixture(response).as('responseFile');

    cy.route({
        method: verb,
        url: new RegExp(`^${endpoint.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`),
        response: '@responseFile',
        status: 200
    }).as('response');
});

Given(/^expect all "([^"]*)" requests to "([^"]*)" will return the combined responses:$/, (verb, endpoint, responses) => {
    responses.rawTable.shift();
    cy.task('loadData', responses.rawTable).then((contents) => {
      cy.server();

      cy.route({
          method: verb,
          url: new RegExp(`^${endpoint.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`),
          response: contents,
          status: 200
      }).as('response');
    });
});
