export default {
    criarUsuarioNaDatabase(self, usuario, uid){
        let database = self.database
        console.log('criando usuarioDatabase com o tipo', usuario.tipo)
        database.ref('/usuario/'+uid+"/").set({nome: usuario.nome, email: usuario.email, tipo: usuario.tipo}).then(result => self.perfil(uid))
        console.info("Usuário Registrado na database com sucesso")
    }
}
