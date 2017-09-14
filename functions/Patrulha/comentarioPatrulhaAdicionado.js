const functions = require('firebase-functions'),
        PATH_COMENTARIOS_PATRULHA = require('../PATHs').PATH_COMENTARIOS_PATRULHA

exports.handler = functions.database.ref(PATH_COMENTARIOS_PATRULHA).onWrite(evento => {
    const comentario = evento.data.val()
    if(comentario.timeStampNeg){
      return
    }
    comentario.timeStampNeg = - comentario.timeStamp
    evento.data.ref.set(comentario)
  })