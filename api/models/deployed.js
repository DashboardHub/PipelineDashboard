const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

module.exports.schema = new Schema({
        id: {
            type: String,
            hashKey: true
        },
        environmentId: {
            type: String
        },
        release: {
            type: String
        },
        token: {
            type: Object
        }
    },
    {
        timestamps: true,
        useDocumentTypes: true,
        useNativeBooleans: true,
        throughput: { read: 1, write: 1 }
    });
