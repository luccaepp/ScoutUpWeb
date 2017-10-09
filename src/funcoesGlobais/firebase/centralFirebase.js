  import * as firebase from 'firebase'
  import firestore from 'firebase/firestore'

    firebase: require("firebase");
    require("firebase/firestore");

    var config = {
    apiKey: "AIzaSyDRvISTAPcm6puLII-_ZleiGmJD37--e80",
    authDomain: "scoutup-59cc7.firebaseapp.com",
    databaseURL: "https://scoutup-59cc7.firebaseio.com",
    projectId: "scoutup-59cc7",
    storageBucket: "scoutup-59cc7.appspot.com",
    messagingSenderId: "793313790543"
  }
  firebase.initializeApp(config)

  export default firebase
  export const usuarioCollection = firebase.firestore().collection('usuario');
