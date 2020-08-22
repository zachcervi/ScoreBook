import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyB4OAQoTmYVNskkOxpIG_qHVMBZ51fdgYE",
    authDomain: "scorebook-66169.firebaseapp.com",
    databaseURL: "https://scorebook-66169.firebaseio.com",
    projectId: "scorebook-66169",
    storageBucket: "scorebook-66169.appspot.com",
    messagingSenderId: "642031642771",
    appId: "1:642031642771:web:df16c7eaa8bbcb7f854566",
    measurementId: "G-1HT1PJKNEE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();