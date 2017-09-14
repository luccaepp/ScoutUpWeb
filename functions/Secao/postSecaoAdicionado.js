const functions = require('firebase-functions'),
      PATH_POSTS_SECAO = require('../PATHs').PATH_POSTS_SECAO

exports.handler = functions.database.ref(PATH_POSTS_SECAO).onWrite(evento => {
    const post = evento.data.val()
    if(post.timeStampNeg){
      return
    }
    post.timeStampNeg = - post.timeStamp
    evento.data.ref.set(post)
  
  })