const cucumber = require('cypress-cucumber-preprocessor').default;
const admin = require('firebase-admin');
const serviceAccount = require('../../../firebase.enc.json');

module.exports = (on, config) => {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://pipelinedashboard-${config.env.FIREBASE}.firebaseio.com`
  });
  const db = admin.firestore();

  on('file:preprocessor', cucumber());

  on('task', {
    'db:update': (params) => {
      return db.collection(params.collection)
        .doc(params.id)
        .update({ [params.field]: params.value });
    }
  });

}
