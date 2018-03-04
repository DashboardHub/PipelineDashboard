const { setWorldConstructor } = require('cucumber')
const request = require('request-promise');

class CustomWorld {

  constructor() {
    this.api = 'http://localhost:3000';
    this.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTE5ODkyNDgiLCJuYW1lIjoiTXIgVGVzdCIsImFkbWluIjp0cnVlfQ.nTXgDjNC2F-NAZDZQr6Uawd3RNDulXYvgSZuDaeXzXw';
  }

  sendRequest(method, path) {
    this.request = request({
      uri: this.api + path,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorizationToken': `Bearer ${this.jwt}`
      },
      resolveWithFullResponse: true,
      json: true
    });
  }
}

setWorldConstructor(CustomWorld)
