const cucumber = require('cypress-cucumber-preprocessor').default
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    async loadData(files) {
      let contents = files.map((file) => fs.readFileSync(`test/fixtures/${file[0]}`, 'utf8').trim())
      let final = `[${contents.join('').concat('\n')}]`;

      return Promise.resolve(`${final.length}\n${final}`);
    }
  })
}
