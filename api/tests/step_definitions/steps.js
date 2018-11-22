const {Given, When, Then} = require('cucumber');
const {expect, should} = require('chai');

Given(/^I am logged in with "([^"]*)" and "([^"]*)"$/, function (email, password) {
  return this.sendRequest('POST', '/auth/login', [{ field: 'email', value: email }, { field: 'password', value: password }])
    .then((response) => {
      this.bearer = response.body.token;
    });
});

When(/^I make a "([^"]*)" request to "([^"]*)"$/, function(method, path) {
  return this.sendRequest(method, path);
});

When(/^I make a "([^"]*)" request to "([^"]*)" with:$/, function(method, path, table) {
  return this.sendRequest(method, path, this.cleanTable(table));
});

Then(/^the status code should be (\d+)$/, function(statusCode) {
  return this.validate(this.statusCode, statusCode);
});

Then(/^should have a field "([^"]*)" with "([^"]*)"$/, function(field, value) {
  return this.validate(this.response.body[field], value);
});

Then(/^should have a field "([^"]*)" with (\d+)$/, function(field, value) {
    return this.validate(this.response.body[field], value);
});

Then(/^should have a field "([^"]*)" with (true|false)$/, function(field, value) {
    return this.validate(this.response.body[field], value === 'true');
});

Then(/^should have a field "([^"]*)" with an empty "([^"]*)"$/, function(field, type) {
  switch (type) {
    case 'array':
      return expect(this.response.body[field]).to.eql([]);
    case 'object':
      return expect(this.response.body[field]).to.eql({});
  }
});

Then(/^should have a field "([^"]*)" with length (\d+)$/, function(field, value) {
  return expect(this.response.body[field].length).to.eql(value);
});

Then(/^should not have a field "([^"]*)"$/, function(field) {
  return should(this.response.body[field]).not.exist;
});

Then(/^should have a field "([^"]*)" with "([^"]*)":$/, function(field, type, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][item.field], item.value))));

  return Promise.all([resolves]);
});

Then(/^should have an "([^"]*)" field "([^"]*)" and in row (\d+) with:$/, function(type, field, row, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][row - 1][item.field], item.value))));

  return Promise.all(resolves);
});

Then(/^should have an "([^"]*)" field "([^"]*)" and in row (\d+) on "([^"]*)" field "([^"]*)" has:$/, function(type, field, row, type2, field2, table) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  resolves.push(Promise.resolve(expect(this.response.body[field][row - 1]).to.be.an(type2)));
  this.cleanTable(table).forEach((item) => resolves.push(Promise.resolve(this.validate(this.response.body[field][row - 1][field2][item.field], item.value))));

  return Promise.all(resolves);
});


Then(/^should have an "([^"]*)" field "([^"]*)" and in row (\d+) no field "([^"]*)"$/, function(type, field, row, field2) {
  let resolves = [];
  resolves.push(Promise.resolve(expect(this.response.body[field]).to.be.an(type)));
  resolves.push(Promise.resolve(should(this.response.body[field][row - 1][field2]).not.exist));

  return Promise.all(resolves);
});
