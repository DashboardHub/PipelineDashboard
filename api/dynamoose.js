const dynamoose = require('dynamoose');

// @TODO: for development
if (proces.env.NODE_ENV === 'development') {
    dynamoose.local();
    dynamoose.AWS.config.update({
        region: 'eu-west-2'
    });
}

module.exports = { dynamoose };
