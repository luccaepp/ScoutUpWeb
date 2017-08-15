export default {
    criarUsuarioNaDatabase(database, usuario, uid){
        database.ref('/usuario/'+uid+"/").set({nome: usuario.nome, email: usuario.email, tipo: usuario.tipoUsuario})
        console.info("Usuário Registrado na database com sucesso")
    }
}