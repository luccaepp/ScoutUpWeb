const functions = require('firebase-functions'),
        PATH_COMENTARIOS_SECAO = require('../PATHs').PATH_COMENTARIOS_SECAO

exports.handler = functions.database.ref(PATH_COMENTARIOS_SECAO).onWrite(evento => {
    const comentario = evento.data.val()
    if(comentario.timeStampNeg){
      return
    }
    comentario.timeStampNeg = - comentario.timeStamp
    evento.data.ref.set(comentario)
  })