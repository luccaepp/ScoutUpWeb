  import * as firebase from 'firebase'
  import {EventBus} from './../eventBus'
  import FuncoesFirebaseDatabase from './../funcoesGlobais/firebase/funcoesDatabase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRvISTAPcm6puLII-_ZleiGmJD37--e80",
    authDomain: "scoutup-59cc7.firebaseapp.com",
    databaseURL: "https://scoutup-59cc7.firebaseio.com",
    projectId: "scoutup-59cc7",
    storageBucket: "scoutup-59cc7.appspot.com",
    messagingSenderId: "793313790543"
  }
  firebase.initializeApp(config)

  firebase.auth().onAuthStateChanged(usuario => {
    if(usuario){
      console.log('conectado')
      EventBus.$emit('usuarioConectado', usuario)
    } else{
      console.log('desconectado')
      EventBus.$emit('usuarioDesconectado')
    }
  })


  
export default {
    firebase: firebase,
    auth: firebase.auth(),
    database: firebase.database(),
    usuario: null,
    usuarioDatabase: ''
}

