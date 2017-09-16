const functions = require('firebase-functions'),
    PATH_ATIVIDADES = require('../PATHs').PATH_ATIVIDADES,
    firebase = require('firebase-admin')


let mailer = require('../E-mail/mailer').mensageiro,
    Email = require('../E-mail/Email').Email,
    htmlAtividade = require('../E-mail/Email').htmlAtividade

exports.handler = functions.database.ref(PATH_ATIVIDADES).onWrite(evento => {
  console.log('entrou na function onWrite')
  let atividades = evento.data.val()
  Object.keys(atividades).map(e => atividades[e]).forEach(atividade => {
    let participantes = atividade.participantes
    console.log('atividade', atividade)
    console.log('participantes', participantes, atividade.participantes)
  if(participantes){
    console.log('passou pelo if')
    participantes.forEach(participante => {
      console.log('entrou no foreach')
      if(participante.tipo == 'grupo') emailParaGrupo(participante, atividade)
        else if(participante.tipo == 'secao') emailParaSecao(participante, atividade)
    })
  }
  })

})

function emailParaGrupo(grupo, atividade){
  console.log('bora mandar email pro grupo')
  let usuariosQueJaForam = []
    firebase.database().ref('/usuario/').orderByChild('grupo').equalTo(grupo.chave).once('value', snap => {
    console.log('achou a query dos usuarios do grupo', usuariosQueJaForam)
    if(usuariosQueJaForam.indexOf(snap.key) != -1) return
    usuariosQueJaForam.push(snap.key)
    const usuariosDesseGrupo = snap.val()
    console.log('usuarios desse grupo', usuariosDesseGrupo)
    Object.keys(usuariosDesseGrupo).map(e => usuariosDesseGrupo[e]).forEach(usuarioDesseGrupo => {
      console.log('usuario desse grupo', usuarioDesseGrupo)
      let email = new Email('projetoscoutup@gmail.com', usuarioDesseGrupo.email, 'ScoutUp! - Atividade em Grupo', htmlAtividade(atividade, usuarioDesseGrupo))
      mailer(email)
    })
  })
}

function emailParaSecao(secao, atividade){
  console.log('bora mandar email pra secao')
  let usuariosQueJaForam = []
    firebase.database().ref('/usuario/').orderByChild('secao/chave').equalTo(secao.chave).once('value', snap => {
    console.log('achou a query dos usuarios da secao')
    if(usuariosQueJaForam.indexOf(snap.key) != -1) return
      usuariosQueJaForam.push(snap.key)
    const usuariosDessaSecao = snap.val()
    Object.keys(usuariosDessaSecao).map(e => usuariosDessaSecao[e]).forEach(usuarioDessaSecao => {
      let email = new Email('projetoscoutup@gmail.com', usuarioDessaSecao.email, 'ScoutUp! - Atividade de Seção', htmlAtividade(atividade, usuarioDessaSecao))
      mailer(email)
    })
  })
}