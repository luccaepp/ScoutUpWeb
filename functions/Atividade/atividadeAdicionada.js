const functions = require('firebase-functions'),
    PATH_ATIVIDADES = require('../PATHs').PATH_ATIVIDADES

exports.handler = functions.database.ref(PATH_ATIVIDADES).onWrite(evento => {
  const atividade = evento.data.val()
})
