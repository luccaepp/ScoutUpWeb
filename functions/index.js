const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const serviceAccount = require("./chave.json");
const numSpams = 5;

admin.initializeApp(functions.config().firebase);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://scoutup-59cc7.firebaseio.com'
}, "database");

const database = admin.database(),
PATH_USUARIO_DATABASE = '/usuario/{hashUsuario}';

const PATH_SECAO = '/grupo/{hashGrupo}/secoes/{hashSecao}'

const PATH_SOLICITACAO_SECAO_USUARIO_DATABASE = PATH_USUARIO_DATABASE+'/solicitacaoDeEntradaEmSecao';
//Alteração na solicitação do usuario, usado para excluir as solicitações anteriores
exports.watchSolicitacaoDeSecaoUsuario = functions.database.ref(PATH_SOLICITACAO_SECAO_USUARIO_DATABASE).onUpdate(evento => {
  const solicitacao = evento.data.val()
  if(evento.previous.exists()){
    const solicitacaoAnterior = evento.previous.val()
    //excluindo referência da solicitação anterior
    return database.ref(PATH_SECAO).child('solicitacoes').child(solicitacaoAnterior.chave).remove()
  }
})

// const PATH_SOLICITACAO_DE_ENTRADA_NA_SECAO = '/grupo/{hashGrupo}/secoes/{hashSecao}/solicitacoes/{hashSolicitacao}/'
// //Validação das Solicitações de entrada na seção
// exports.validacaoDaSolicitacaoDeEntradaNaSecao = functions.database.ref(PATH_SOLICITACAO_DE_ENTRADA_NA_SECAO).onWrite(evento => {
//   const solicitacao = evento.data.val()
//   database.ref('/')
// })


//Inversões de TimeStamp


const PATH_POSTS_SECAO = PATH_SECAO+'/posts/{hashPost}',
PATH_COMENTARIOS_SECAO = PATH_POSTS_SECAO+'/comentarios/{hashComentario}',
PATH_POSTS_PATRULHA = PATH_SECAO+'/patrulhas/{hashPatrulha}/posts/{hashPost}',
PATH_COMENTARIOS_PATRULHA = PATH_POSTS_PATRULHA+'/comentarios/{hashComentario}'

exports.postPatrulhaAdicionado = functions.database.ref(PATH_POSTS_PATRULHA).onWrite(evento => {
  const post = evento.data.val()
  if(post.timeStampNeg){
    return
  }
  post.timeStampNeg = - post.timeStamp
  evento.data.ref.set(post)
})

exports.comentarioPatrulhaAdicionado = functions.database.ref(PATH_COMENTARIOS_PATRULHA).onWrite(evento => {
  const comentario = evento.data.val()
  if(comentario.timeStampNeg){
    return
  }
  comentario.timeStampNeg = - comentario.timeStamp
  evento.data.ref.set(comentario)
})

exports.postSecaoAdicionado = functions.database.ref(PATH_POSTS_SECAO).onWrite(evento => {
  const post = evento.data.val()
  if(post.timeStampNeg){
    return
  }
  post.timeStampNeg = - post.timeStamp
  evento.data.ref.set(post)

})

exports.comentarioPostSecaoAdicionado = functions.database.ref(PATH_COMENTARIOS_SECAO).onWrite(evento => {
  const comentario = evento.data.val()
  if(comentario.timeStampNeg){
    return
  }
  comentario.timeStampNeg = - comentario.timeStamp
  evento.data.ref.set(comentario)
})







//Teste inicial pra saber como as Cloud Functions funcionam
// exports.postee = functions.database.ref('/posts/{hashid}').onWrite(evento => {
//   const post = evento.data.val()
//   if(post.sanitized){
//     return
//   }
//   console.log("Sanitizing... "+evento.params.pushId)
//   post.title = sanitize(post.title)
//   post.body = sanitize(post.body)
//   evento.data.ref.set(post)
// });

//Spammer de e-mail para o gabriel
// exports.spammer = functions.https.onRequest((req, res) => {

//     const transporter = nodemailer.createTransport( {
//     service: 'gmail',
//     auth: {
//       user: 'projetoscoutup@gmail.com',
//       pass: 'leonardoChim'
//     }
//   })

// var numAtualDeEmails = 0;
//   database.ref("/emails").once("value", (snapshot) =>{
//     database.ref().set({
//       emails: snapshot.val() + numSpams
//     })
//     numAtualDeEmails = snapshot.val() + numSpams
//   });
//   for(var i = 0;i<numSpams;i++){

//     const email_subject = {
//     from: '"Scoutup" <projetoscoutup@gmail.com>',
//     to: "gabrielfranciscodospassos@gmail.com",
//     subject: "VOCÊ CAIU NA "+ (numAtualDeEmails) + " invenção do Rodney Lataria",
//     html: '<h1>vose caiyu nu contú´´Ú``Uh dooooh isscshcoteirooo kkjkjjkjkjjjkjkj</h1> <img src="cid:imagem">',
//     attachments: [
//       {
//         filename: 'rodney.jpeg',
//         path: './rodney.jpeg',
//         cid: 'imagem'
//       }
//     ]
//   }
//   transporter.sendMail(email_subject).then(() => {
//       res.send("SPAMOU");
//   }).catch(erro => {res.send(erro)})

// }

// });

// function sanitize(s){
//   var sanitizedText = s
//   sanitizedText = sanitizedText.replace("stupid", "wonderful")
//   return sanitizedText;
// }
