import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'

const state = {
  firebase: firebase,
  auth: firebase.auth(),
  database: firebase.database(),
  storage: firebase.app().storage(),
  usuario: null,
  usuarioDatabase: null
}


firebase.auth().onAuthStateChanged(usuario => {
  if(usuario){
    console.log('conectado')
    EventBus.$emit('usuarioConectado', usuario)
  } else{
    console.log('desconectado')
    EventBus.$emit('usuarioDesconectado')
  }
})

const amOnline = firebase.database().ref('.info/connected')
amOnline.on('value', snapshot => {
  console.log("evento .info/connected emitido")
  let currentUser = firebase.auth().currentUser
  if(snapshot.val() && currentUser){
    console.log("chave do usuario", currentUser.uid)
    const statusRef = firebase.database().ref("/usuario/"+currentUser.uid+"/status")
    const usuarioRef = firebase.database().ref("/usuario/"+currentUser.uid)
    statusRef.onDisconnect().set('offline').then(EventBus.$emit('cadastrarStatusNasFriendLists', usuarioRef))
    statusRef.set('online').then(EventBus.$emit('cadastrarStatusNasFriendLists', usuarioRef))
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
            amigo.ref.update({ status: usuario.val().status })
          }else{
            amigo.ref.update({status: 'offline'})
          }
        })
      })
    })
  })
})

export default state
