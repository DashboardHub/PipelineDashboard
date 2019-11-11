const cucumber = require('cypress-cucumber-preprocessor').default;
const admin = require('firebase-admin');
const serviceAccount = require('../../pipelinedashboard-eddie-firebase-adminsdk-ym78i-925f982c6a.enc.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pipelinedashboard-eddie.firebaseio.com"
});
const db = admin.firestore();

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    'db:update': (params) => {
      return db.collection(params.collection)
        .doc(params.id)
        .update({ [params.field]: params.value });
    }
  })
}
