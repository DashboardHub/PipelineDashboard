const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const shell = require('shelljs');

let config = JSON.parse(fs.readFileSync('config.json'));

defineSupportCode(function ({ BeforeAll, Before }) {

    Before('@Seed', function () {

        Object.entries(config.dynamodb).forEach((item) => {
            shell.echo(`Dropping table ${item[1].table}...`);
            let awsProfile = process.env.AWS_PROFILE ? `AWS_PROFILE=${process.env.AWS_PROFILE}` : '';
            if (shell.exec(`${awsProfile} aws dynamodb delete-table --table-name ${item[1].table} --endpoint-url http://localhost:8000 --region localhost > /dev/null`).code !== 0) {
                shell.echo(`Warning: dropping table ${item[1].table}`);
            }
        });

        shell.echo('Migrations...');
        if (shell.exec('./node_modules/serverless/bin/serverless dynamodb migrate --stage=dev').code !== 0) {
            shell.echo('Error: Migrating test tables');
            shell.exit(1);
        }
        shell.echo('Migrations complete');

        shell.echo('Seeding data...');
        if (shell.exec('./node_modules/serverless/bin/serverless dynamodb seed --seed=test --stage=dev').code !== 0) {
            shell.echo('Error: Seeding test data');
            shell.exit(1);
        }
        shell.echo('Seeding complete');
    });

});
