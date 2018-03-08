const { setWorldConstructor } = require('cucumber');
const request = require('request-promise');
const config = require('../../config');

class CustomWorld {

  constructor() {
    this.api = 'http://localhost:3000';
  }

  login() {
    if (!this.jwt) { // @TODO: Only call once
        return request({
            uri: 'https://dashboardhub-dev.eu.auth0.com/oauth/token',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            resolveWithFullResponse: true,
            json: true,
            body: {
                client_id: config.envars.AUTH0_CLIENT_ID,
                client_secret: config.envars.AUTH0_CLIENT_SECRET,
                audience: 'http://localhost:3000',
                grant_type: 'client_credentials'
            }
        });
    }
  }

  sendRequest(method, path) {
    this.request = request({
      uri: this.api + path,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.jwt}`
      },
      resolveWithFullResponse: true,
      json: true
    });
  }

  cleanTable(table) {
    let cleaned = [];
    table.hashes().forEach((item) => {
      try {
        cleaned.push({ field: item.field, value: JSON.parse(item.value) });
      } catch (e) {
        cleaned.push({ field: item.field, value: item.value });
      }
    });

    return cleaned;
  }
}

setWorldConstructor(CustomWorld);
