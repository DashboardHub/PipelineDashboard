// import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

firebase.initializeApp()

const attachCustomCommands = (
  Cypress,
  { auth, firestore }: typeof firebase,
) => {
  let currentUser: null | firebase.User = null
  auth().onAuthStateChanged(user => {
    currentUser = user
  })

  Cypress.Commands.add('login', (email, password) => {
    Cypress.log({
      displayName: 'login',
      consoleProps: () => {
        return { email, password }
      },
    })
    return auth().signInWithEmailAndPassword(email, password)
  })

  Cypress.Commands.add('logout', () => {
    const userInfo = currentUser ? currentUser.email : 'Not login yet - Skipped'
    Cypress.log({
      displayName: 'logout',
      consoleProps: () => {
        return { currentUser: userInfo }
      },
    })
    return auth().signOut()
  })

  Cypress.Commands.add('firestore', () => {
    return firestore()
  })

}

attachCustomCommands(Cypress, firebase)
