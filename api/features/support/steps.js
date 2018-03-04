const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');


Given('I am logged in', function(callback) {
  this.login()
    .then((response) => {
      this.jwt = response.body.access_token;
      callback();
    })
    .catch((err) => console.log(err));
});

When('I make a {string} request to {string}', function(method, path) {
  this.sendRequest(method, path);
});

Then('the status code should be {int}', function(statusCode) {
  this.request
    .then((response) => expect(response.statusCode).to.eql(statusCode));
});

Then('should have a field {string} with value {int}', function(field, value) {
  this.request
    .then((response) => expect(response.body[field]).to.eql(value));
});

Then('should have a field {string} with length {int}', function(field, value) {
  this.request
    .then((response) => expect(response.body[field].length).to.eql(value));
});

Then('should have a field {string} and in row {int} with:', function(field, row, table) {
  this.request
    .then((response) => {
      expect(response.body[field]).to.be.an('array');
      this.cleanTable(table).forEach((item) => expect(response.body[field][row - 1][item.field]).to.eql(item.value));
    });
});
