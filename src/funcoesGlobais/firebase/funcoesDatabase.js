export default {
    prepararCommitDoChangeDoUsuarioDaDatabase(uid, database, store){
        database.ref('usuario/'+uid+"/").on('value', snapshot => {
            var snap = snapshot.val()
            store.commit('MUDAR_USUARIO_DATABASE', snap)
        })
    },
    criarUsuarioNaDatabase(database, usuario, uid){
        database.ref('/usuario/'+uid+"/").set({nome: usuario.nome, email: usuario.email, tipo: usuario.tipoUsuario})
        console.info("Usuário Registrado na database com sucesso")
    }
}