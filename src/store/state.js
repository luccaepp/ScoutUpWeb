import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'


firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

const state = {
  firebase: firebase,
  auth: firebase.auth(),
  database: firebase.database(),
  usuario: null,
  usuarioDatabase: null
}

export default state