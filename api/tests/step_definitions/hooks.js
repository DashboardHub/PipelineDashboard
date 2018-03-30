const { defineSupportCode } = require('cucumber');
const shell = require('shelljs');

defineSupportCode(function ({ BeforeAll, Before }) {

    Before(function () {
        if (shell.exec('./node_modules/serverless/bin/serverless dynamodb seed --seed=test --stage=dev').code !== 0) {
            shell.echo('Error: Seeding test data');
            shell.exit(1);
        }
    });

});
