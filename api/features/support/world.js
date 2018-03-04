const { setWorldConstructor } = require('cucumber')
const request = require('request-promise');

class CustomWorld {

  constructor() {
    this.api = 'http://localhost:3000';
    this.jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VSkVRekZEUkVFNU0wUkNOekl5UmtZMFJqQTRSa1l5UlVRek5qTkNPRUkyTURreU1VUTJSZyJ9.eyJpc3MiOiJodHRwczovL2Rhc2hib2FyZGh1Yi1kZXYuZXUuYXV0aDAuY29tLyIsInN1YiI6IlJ3YkZYU3lqWjZGM0hKM1FjNUNHVU5NZFNYOGYzbTc5QGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpYXQiOjE1MjAxNTA1MTMsImV4cCI6MTUyMDIzNjkxMywiYXpwIjoiUndiRlhTeWpaNkYzSEozUWM1Q0dVTk1kU1g4ZjNtNzkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.SsZicWfX1RavnVHQAHGB4r0pdoDJ22-_UZrj09kkHaXdjle44cadl1AM-krksxUQnIaEAWNnlJIvuSBz2JrZXFU4B_6px-OtWVypVc59Ki8BqEqNzYIOnOWijEES9kjrvvntKd_iQLhTFvWLU0CWugD9JCCcJk-t6a2jmMvDCD-OK4jb2wmoQbiwVYGYsi12eyB74gtkA851wbSOVBQSaMR7shgV9kIM4K92gLA_38LxeWFb4BBZ4_6H2ILJaQeXFMBWSZEvuRYDMhqIJe_K7F4rn-Qz_s8_-jtJ_h84cAUtaqWEcmTL76BgyS7jGhhX8Po0C9aF1BzyvcuNLLk0cw';
  }

  sendRequest(method, path) {
    this.request = request({
      uri: this.api + path,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.jwt}`
      },
      resolveWithFullResponse: true,
      json: true
    });
  }
}

setWorldConstructor(CustomWorld);

// curl --request POST \
//   --url https://dashboardhub-dev.eu.auth0.com/oauth/token \
//     --header 'content-type: application/json' \
//   --data '{"client_id":"RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79","client_secret":"Y9lX9GNPuxTG9t2XEPa05xYq_PBPn-jWa7tVGpQjlmh0H6McBjSICyAeUPLxWRgm","audience":"http://localhost:3000","grant_type":"client_credentials"}'
//
// curl --request GET \
//   --url http://localhost:3000/environments/list \
//     --header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5VSkVRekZEUkVFNU0wUkNOekl5UmtZMFJqQTRSa1l5UlVRek5qTkNPRUkyTURreU1VUTJSZyJ9.eyJpc3MiOiJodHRwczovL2Rhc2hib2FyZGh1Yi1kZXYuZXUuYXV0aDAuY29tLyIsInN1YiI6IlJ3YkZYU3lqWjZGM0hKM1FjNUNHVU5NZFNYOGYzbTc5QGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpYXQiOjE1MjAxNTE0MTUsImV4cCI6MTUyMDIzNzgxNSwiYXpwIjoiUndiRlhTeWpaNkYzSEozUWM1Q0dVTk1kU1g4ZjNtNzkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.B2GRAG4pqpSgDxJMcTiNsjW5_88lpvr7fsW_jtj854n6uv47tqg4kdYLIaumXLKQJoft2d2jzIKi0TMPU9yVTH8y6bVEOT01TRcu2OrE8FTYS-SY9W-S_n564zm28tnZJ5JaYk7mUUUZ97M0cWjEIWTZ2u78Tbm-hvd8qd_SeCgQ6wiW5H0Q96NQtQOeZpNlnBqa5_UkyrvF9nJb3DxL7lYlUtDOA1NxbME8WWLwcb1gsWnSMu0lErF9mhw7aOw8LfciuWZCwv1QfjXxLnEPZg9vc8Gf9ZH2_OZXJUJDqF-ETdOObxuslNtPzikYE9GBcWTkrcACR9iyaKhmKxAYLA'