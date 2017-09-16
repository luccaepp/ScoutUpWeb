exports.Email = function Email(de, para, assunto, html, attachments = null){
  this.from = de
  this.to = para
  this.subject = assunto
  this.html = html
  this.attachments = attachments
}

exports.htmlAtividade = function(atividade, usuario){
  return '<h4>Caro(a) '+ usuario.nome +
          ', você acaba de ser convidado(a) para a atividade em grupo ' + atividade.titulo
          ' - ' +  '<span style="color: green">' + atividade.tipo + '</span>.\n' +   
          'Para mais informações, acesse o seu calendário de atividades clicando <a href="https://scoutup-59cc7.firebaseapp.com/#/atividades">aqui</a>.' +                   
         '</h4>'
}
