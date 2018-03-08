const { Given, When, Then } = require('cucumber');
const { expect, should } = require('chai');


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

Then('should have a field {string} with value {string}', function(field, value) {
  this.request
    .then((response) => expect(response.body[field]).to.eql(value));
});

Then('should have a field {string} with value (true|false)', function(field, value) {
  this.request
    .then((response) => expect(response.body[field]).to.eql(value));
});

Then('should have a field {string} with length {int}', function(field, value) {
  this.request
    .then((response) => expect(response.body[field].length).to.eql(value));
});

Then('should not have a field {string}', function(field) {
  this.request
    .then((response) => should(response.body[field]).not.exist);
});

Then('should have a field {string} with object:', function(field, table) {
  this.request
    .then((response) => {
      expect(response.body[field]).to.be.an('object');
      this.cleanTable(table).forEach((item) => expect(response.body[field][item.field]).to.eql(item.value));
    });
});

Then('should have a field {string} and in row {int} with:', function(field, row, table) {
  this.request
    .then((response) => {
      expect(response.body[field]).to.be.an('array');
      this.cleanTable(table).forEach((item) => expect(response.body[field][row - 1][item.field]).to.eql(item.value));
    });
});

Then('should have a field {string} and in row {int} on field {string} has:', function(field, row, field2, table) {
  this.request
    .then((response) => {
      expect(response.body[field][row]).to.be.an('object');
      this.cleanTable(table).forEach((item) => expect(response.body[field][row - 1][field2][item.field]).to.eql(item.value));
    });
});
