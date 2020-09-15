import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyD88oRf8pI5bABKP9OBE_T0CE6U9Uc8K18",
    authDomain: "bartersystem-18e3e.firebaseapp.com",
    databaseURL: "https://bartersystem-18e3e.firebaseio.com",
    projectId: "bartersystem-18e3e",
    storageBucket: "bartersystem-18e3e.appspot.com",
    messagingSenderId: "408467793551",
    appId: "1:408467793551:web:af4b495ee2ba3ac987f2fa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();