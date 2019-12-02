const cucumber = require('cypress-cucumber-preprocessor').default;
const admin = require('firebase-admin');
const serviceAccount = require('../../../firebase.enc.json');

const traverse = (o, fn) => {
  Object.entries(o).forEach((i) => {
    if (i[1] !== null && (typeof (i[1]) === 'object' || typeof (i[1]) === 'array')) {
      traverse(i[1], fn);
    } else {
      o[i[0]] = fn(i);
    }
  });
};

module.exports = (on, config) => {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://pipelinedashboard-${config.env.FIREBASE}.firebaseio.com`
  });
  const db = admin.firestore();

  let manipulate = (data) => {
    traverse(data, (item) => {
      switch (item[1]) {
        case 'DATETIME[NOW]':
          return admin.firestore.Timestamp.fromDate(new Date())
        default:
          return item[1];
      }
    });

    return data;
  };

  on('file:preprocessor', cucumber());

  on('task', {
    'db:update': (params) => db.collection(params.collection)
        .doc(params.id)
        .update({ [params.field]: params.value }),

    'db:project:save': (params) => db.collection(params.collection)
        .doc(params.doc)
        .set({
          ...manipulate(params.data),
          createdOn: admin.firestore.Timestamp.fromDate(new Date('2050-01-01')),
          updatedOn: admin.firestore.Timestamp.fromDate(new Date('2050-01-01'))
        })
        .then(() => db.collection(params.collection)
          .doc(params.doc)
          .get()),

    'db:delete:collection': (params) => db.collection(params.collection).get()
      .then((querySnapshot) => {
        const deletes = [];
        querySnapshot
          .forEach((doc) => {
            if ((doc.id).startsWith('test-')) {
              deletes.push(db.collection(params.collection).doc(doc.id).delete());
            }
          });

          return Promise.all(deletes);
        }),

  });
}
