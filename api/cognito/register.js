'use strict';

module.exports.preSignUp = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // TODO Confirm this is a user that should be auto-confirmed, e.g., has a valid token in event.request.validationData
    let autoConfirm = true;

    if (autoConfirm) {
        event.response.autoConfirmUser = true;
        console.log('Auto confirmed user');

        if (event.request.userAttributes.hasOwnProperty("email")) {
            event.response.autoVerifyEmail = true;
            console.log('Set email verified');
        }

        if (event.request.userAttributes.hasOwnProperty("phone_number")) {
            event.response.autoVerifyPhone = true;
            console.log('Set phone_number verified');
        }
    }

    callback(null, event);
};
