import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'


firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
    setStatus(usuario.uid)
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

firebase.database().ref('.info/connected').on('value', snapshot => {
  let currentUser = firebase.auth().currentUser
  if(snapshot.val() && currentUser){
    console.log("chave do usuario", currentUser.uid)
    setStatus(currentUser.uid)
  }
})

function setStatus(uid){
  const statusRef = firebase.database().ref("/usuario/"+uid+"/status")
  const usuarioRef = firebase.database().ref("/usuario/"+uid)

  statusRef.onDisconnect().update('offline').then(EventBus.$emit('cadastrarStatusNasFriendLists', usuarioRef))
  statusRef.update('online').then(EventBus.$emit('cadastrarStatusNasFriendLists', usuarioRef))

}


EventBus.$on('cadastrarStatusNasFriendLists', userAtualRef => {
  const chaveUsuario = userAtualRef.key
  const usuariosRef = firebase.database().ref('/usuario/')
  userAtualRef.child('/amigos').once('value', amigos => {
    amigos.forEach(amigo => {
      usuariosRef.orderByKey().equalTo(amigo.val().chave).on('value',usuarios =>{
        usuarios.forEach(usuario => {
          console.log("usuario.val()",usuario.val())
          if(usuario.val().status){
            amigo.ref.child('/status/').update(usuario.val().status)
          }else{
            amigo.ref.child('/status/').update('offline')
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
