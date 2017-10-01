import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'


firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
    const presencaRef = firebase.database().ref("/usuario/"+usuario.uid+"/presenca")
    const statusRef = firebase.database().ref("/usuario/"+usuario.uid+"/status")
    presencaRef.onDisconnect().set('invisivel')
    statusRef.onDisconnect().set('deslogado')
    presencaRef.set('visivel')
    statusRef.set('logado')
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

const state = {
  firebase: firebase,
  auth: firebase.auth(),
  database: firebase.database(),
  storage: firebase.storage(),
  usuario: null,
  usuarioDatabase: null
}

export default state