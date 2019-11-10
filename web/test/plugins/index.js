const cucumber = require('cypress-cucumber-preprocessor').default;
const cyTpPreProcessor = require('./ts-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', (file) => {
    cyTpPreProcessor;
    cucumber(file);

    return file;
  });
}
