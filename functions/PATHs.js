exports.PATH_USUARIO_DATABASE = '/usuario/{hashUsuario}'

const PATH_SECAO = '/grupo/{hashGrupo}/secoes/{hashSecao}'
exports.PATH_SECAO = PATH_SECAO

const PATH_USUARIO_DATABASE = '/usuario/{hashUsuario}'
exports.PATH_USUARIO_DATABASE = PATH_USUARIO_DATABASE

exports.PATH_SOLICITACAO_SECAO_USUARIO_DATABASE = PATH_USUARIO_DATABASE + '/solicitacaoDeEntradaEmSecao'

const PATH_POSTS_SECAO = PATH_SECAO + '/posts/{hashPost}'
exports.PATH_POSTS_SECAO = PATH_POSTS_SECAO

exports.PATH_COMENTARIOS_SECAO = PATH_POSTS_SECAO + '/comentarios/{hashComentario}'

const PATH_POSTS_PATRULHA = PATH_SECAO + '/patrulhas/{hashPatrulha}/posts/{hashPost}'
exports.PATH_POSTS_PATRULHA = PATH_POSTS_PATRULHA
exports.PATH_COMENTARIOS_PATRULHA = PATH_POSTS_PATRULHA + '/comentarios/{hashComentario}'

exports.PATH_ATIVIDADES = '/atividade'
