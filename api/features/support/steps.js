const {Given, When, Then} = require('cucumber');
const {expect, should} = require('chai');

Given('I am logged in', function() {
  return this.login().then((response) => this.jwt = response.body.access_token).catch((err) => console.log(err));
});

When('I make a {string} request to {string}', function(method, path) {
  return this.sendRequest(method, path);
});

When('I make a {string} request to {string} with:', function(method, path, table) {
  return this.sendRequest(method, path, this.cleanTable(table));
});

Then('the status code should be {int}', function(statusCode) {
  return this.validate(this.response.statusCode, statusCode);
});

Then('should have a field {string} with integer {int}', function(field, value) {
  return this.validate(this.response.body[field], value);
});

Then('should have a field {string} with string {string}', function(field, value) {
  return this.validate(this.response.body[field], value);
});

Then('should have a field {string} with boolean {string}', function(field, value) {
  return this.validate(this.response.body[field], value == 'true');
});

Then('should have a field {string} with an empty {string}', function(field, type) {
  switch (type) {
    case 'array':
      return expect(this.response.body[field]).to.eql([]);
      break;
    case 'object':
      return expect(this.response.body[field]).to.eql({});
      break;
  }
});

Then('should have a field {string} with length {int}', function(field, value) {
  return expect(this.response.body[field].length).to.eql(value);
});

Then('should not have a field {string}', function(field) {
  return should(this.response.body[field]).not.exist;
});

Then('should have a field {string} with {string}:', function(field, type, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][item.field], item.value))));

  return Promise.all([resolves]);
});

Then('should have an {string} field {string} and in row {int} with:', function(type, field, row, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][row - 1][item.field], item.value))));

  return Promise.all(resolves);
});

Then('should have an {string} field {string} and in row {int} on {string} field {string} has:', function(type, field, row, type2, field2, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  resolves.push(Promise.resolve(expect(this.response.body[field][row]).to.be.an(type2)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][row - 1][field2][item.field], item.value))));

  return Promise.all(resolves);
});
