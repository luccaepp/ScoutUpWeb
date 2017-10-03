import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'


firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
    const statusRef = firebase.database().ref("/usuario/"+usuario.uid+"/status")
    const usuarioRef = firebase.database().ref("/usuario/"+usuario.uid)   

    statusRef.onDisconnect().set('offline').then(EventBus.$emit('cadastrarStatusNasFriendLists',usuarioRef)
    )
    statusRef.set('online').then(EventBus.$emit('cadastrarStatusNasFriendLists', usuarioRef)
  )
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

EventBus.$on('cadastrarStatusNasFriendLists', userAtualRef => {
  const chaveUsuario = userAtualRef.key
  const usuariosRef = firebase.database().ref('/usuario/')
  userAtualRef.child('/amigos').once('value', amigos => {
    amigos.forEach(amigo => {
      usuariosRef.orderByKey().equalTo(amigo.val().chave).on('value',usuarios =>{
        usuarios.forEach(usuario => {
          console.log("usuario.val()",usuario.val())
          if(usuario.val().status){
            amigo.ref.child('/status/').set(usuario.val().status)
          }else{
            amigo.ref.child('/status/').set('offline')
          }
        })
      })
    })
  })
})


const state = {
  firebase: firebase,
  auth: firebase.auth(),
  database: firebase.database(),
  storage: firebase.app().storage(),
  usuario: null,
  usuarioDatabase: null
}

export default state