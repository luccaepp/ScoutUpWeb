const PATH_SOLICITACAO_SECAO_USUARIO_DATABASE = require('../PATHs').PATH_SOLICITACAO_SECAO_USUARIO_DATABASE,
        functions = require('firebase-functions')

//Alteração na solicitação do usuario, usado para excluir as solicitações anteriores
exports.handler = functions.database.ref(PATH_SOLICITACAO_SECAO_USUARIO_DATABASE).onUpdate(evento => {
    const solicitacao = evento.data.val()
    if(evento.previous.exists()){
      const solicitacaoAnterior = evento.previous.val()
      //excluindo referência da solicitação anterior
      return database.ref('/grupo/'+solicitacaoAnterior.chaveGrupo+'/secoes/'+solicitacaoAnterior.chaveSecao)
                                          .child('solicitacoes').orderByChild('usuario/chave').equalTo(evento.data.ref.parent.key)
                                          .once('value', snapshot => {
                                                var updates = {};
                                                snapshot.forEach(child => updates[child.key] = null);
                                                ref.update(updates);
                                          })
    }
  })