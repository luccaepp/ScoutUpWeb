const functions = require('firebase-functions'),
    PATH_POSTS_PATRULHA = require('../PATHs').PATH_POSTS_PATRULHA

exports.handler = functions.database.ref(PATH_POSTS_PATRULHA).onWrite(evento => {
    const post = evento.data.val()
    if(post.timeStampNeg){
      return
    }
    post.timeStampNeg = - post.timeStamp
    evento.data.ref.set(post)
  })