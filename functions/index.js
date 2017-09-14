const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const serviceAccount = require("./chave.json");
const numSpams = 5;

initFirebase()

const database = admin.database();
const PATH_USUARIO_DATABASE = require('./PATHs').PATH_USUARIO_DATABASE,
      PATH_SECAO = require('./PATHs').PATH_SECAO

//Excluindo solicitações de entrada na seção antigas
exports.watchSolicitacaoDeSecaoUsuario = require('./Secao/watchSolicitacaoDeSecaoUsuario').handler


//Inversões de TimeStamp
exports.postPatrulhaAdicionado = require('./Patrulha/postPatrulhaAdicionado').handler

exports.comentarioPatrulhaAdicionado = require('./Patrulha/comentarioPatrulhaAdicionado').handler

exports.postSecaoAdicionado = require('./Secao/postSecaoAdicionado').handler

exports.comentarioPostSecaoAdicionado = require('./Secao/comentarioPostSecaoAdicionado').handler




function initFirebase(){
  admin.initializeApp(functions.config().firebase);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://scoutup-59cc7.firebaseio.com'
  }, "database");
}


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
