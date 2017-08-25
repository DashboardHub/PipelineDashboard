'use strict';

module.exports.help = (event, context, callback) => {
    callback(null, {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: 'This is the help section. One voice command available. One, To list the environments and their release version, please use. Alexa ask Dashboard Hub what is deployed',
            },
            shouldEndSession: true,
        },
    });
};
