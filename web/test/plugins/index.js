const cucumber = require('cypress-cucumber-preprocessor').default;
const admin = require('firebase-admin');
const serviceAccount = require('../../../firebase.enc.json');

module.exports = (on, config) => {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://pipelinedashboard-${config.env.FIREBASE}.firebaseio.com`
  });
  const db = admin.firestore();

  let manipulate = (data) => {
    const newData = {}
    Object.entries(data).forEach((item) => {
      switch (item[1]) {
        case 'DATETIME[NOW]':
          newData[item[0]] = admin.firestore.Timestamp.fromDate(new Date())
          break;
        default:
          newData[item[0]] = item[1];
      }
    });
    console.log(newData);
    return newData;
  };

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
          ...manipulate(params.data),
          createdOn: admin.firestore.Timestamp.fromDate(new Date('2050-01-01')),
          updatedOn: admin.firestore.Timestamp.fromDate(new Date('2050-01-01'))
        });
    }
  });

}
