export default {
    criarUsuarioNaDatabase(database, usuario, uid){

      database.collection("usuario").doc(uid).set(usuario)

},

consultarUsuarioNaDatabase(database, uid){

var user = database.collection('usuario').doc(uid).get();

  return user

}

}
