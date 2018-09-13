const { setWorldConstructor } = require('cucumber');
const { expect, should } = require('chai');
const supertest = require('supertest');

class CustomWorld {

  constructor() {
    this.agent = supertest(require(`../../src/server.js`));
  }

  sendRequest(method, path, data = []) {
    let body = {};

    switch(method) {
        case 'POST':
          let post = {};
          data.forEach((item) => post[item.field] = item.value);
          body = post;
          break;
        case 'PATCH':
          let patch = [];
          data.forEach((item) => patch.push({ op: 'replace', 'path': `/${item.field}`, 'value': item.value }));
          body = patch;
          break;
    }

    return this.agent[method.toLowerCase()](path)
        .set('Accept', 'application/json')
        // .set('Authorization', 'bearer ')
        .send(body)
        .then((response) => {
            this.statusCode = response.statusCode;
            this.response = response;
            console.log(body)
        })
        .catch((error) => this.response = error);
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

  validate(actual, expected) {
    let special = '';

    if (typeof expected === 'string' && expected.startsWith('ARRAY')) {
        special = expected.match(/ARRAY\[(\d+)\]/)[1];
        expected = 'ARRAY';
    }

    if (typeof expected === 'string' && expected.startsWith('APPROXIMATELY')) {
        special = expected.match(/APPROXIMATELY\((\d+)\)/)[1];
        expected = 'APPROXIMATELY';
    }

    if (typeof expected === 'string' && expected.startsWith('BOOLEAN')) {
        special = expected.match(/BOOLEAN\[(\S+)\]/)[1] === 'TRUE';
        expected = 'BOOLEAN';
    }

    if (typeof expected === 'string' && expected.startsWith('NOW')) {
        let match = expected.match(/NOW\[(\+|-)(\d*)(mins|secs)\]/) || [];
        special = {
            operator: match[1] || '+',
            expected: parseFloat(match[2]) || 0,
            units: match[3] || 'secs'
        };
        expected = 'NOW';
    }

    switch (expected) {
        case 'NULL':
            expect(actual).to.be.null;
            break;
        case 'UUID':
            expect(actual).to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i);
            break;
        case 'STRING':
            expect(actual).to.be.a('string');
            break;
        case 'NUMBER':
            expect(actual).to.be.a('number');
            break;
        case 'APPROXIMATELY':
            expect(actual).to.be.approximately(parseInt(special), 80);
            break;
        case 'OBJECT':
            expect(actual).to.be.an('object');
            break;
        case 'ARRAY':
            expect(actual).to.be.an('array');
            expect(actual).to.have.lengthOf(special);
            break;
        case 'DATETIME':
            let date = new Date(actual);
            expect(date).to.be.a('date');
            expect(date.toString()).not.to.equal('Invalid Date');
            break;
        case 'DATE':
            let dateOnly = new Date(actual);
            expect(dateOnly).to.be.a('date');
            expect(dateOnly.toString()).not.to.equal('Invalid Date');
            break;
        case 'TIME':
            let timeOnly = new Date('1970-01-01T' + actual);
            expect(timeOnly).to.be.a('date');
            expect(timeOnly.toString()).not.to.equal('Invalid Date');
            break;
        case 'BOOLEAN':
            expect(actual).to.be.a('boolean');
            expect(actual).to.equal(special);
            break;
        case 'NOW':
            let check = new Date();

            if (special.operator === '-') {
                special.expected *= -1;
            }

            switch (special.units) {
                case 'secs':
                    check.setSeconds(check.getSeconds() + special.expected);
                    break;
                case 'mins':
                    check.setMinutes(check.getMinutes() + special.expected);
                    break;
            }

            expect(new Date(actual).getTime()).to.be.closeTo(check.getTime(), 500);
            break;
        default:
            expect(actual).to.deep.equal(expected);
      }

      return true;
  }
}

setWorldConstructor(CustomWorld);
