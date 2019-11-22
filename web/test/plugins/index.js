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

  on('task', {
    'db:project:save': (params) => {
      return db.collection(params.collection)
        .doc(params.doc)
        .set({
          ...params.data,
          createdOn: admin.firestore.Timestamp.fromDate(new Date("2050-01-01")),
          updatedOn: admin.firestore.Timestamp.fromDate(new Date("2050-01-01"))
        });
    }
  });

}
