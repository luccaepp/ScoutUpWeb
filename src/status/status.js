import {EventBus} from './../eventBus'
import firebase from './../funcoesGlobais/firebase/centralFirebase'

const status = {
  userId:null
  ,
  atualizarOnConnected(){
    firebase.database().ref('.info/connected').on('value', snapshot => {
        console.log('.info/connected', snapshot.val())
        this.atualizarStatus(snapshot.val() ? 'online' : 'offline')
    })
  },
  atualizarStatus(status){
    const userRef = firebase.database().ref("/usuario/"+this.userId)
    userRef.update({status}).then(EventBus.$emit('atualizarStatusNasFriendLists', userRef))
  },
  atualizarOnDisconnected(){
    const userRef = firebase.database().ref("/usuario/"+this.userId)
    userRef.onDisconnect().update({status: 'offline'}).then(EventBus.$emit('atualizarStatusNasFriendLists', userRef))
  }
}

EventBus.$on('usuarioDatabasePreenchido', user =>{
  if(user){
    console.log("zemphone")
    status.userId = user['.key']
    status.atualizarOnConnected()
    status.atualizarOnDisconnected()
  }
})

EventBus.$on('atualizarStatusNasFriendLists', userAtualRef => {
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

export default status
