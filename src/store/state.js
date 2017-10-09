import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'



const state = {

  firebase: firebase,
  auth: firebase.auth(),
  firestore: firebase.firestore(),
  database: firebase.firestore(),
  storage: firebase.app().storage(),
  usuario: null,
  usuarioDatabase: null
}

firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
    console.log("userUID", usuario.uid)
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

export default state
