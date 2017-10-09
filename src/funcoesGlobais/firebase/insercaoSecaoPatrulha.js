export default function(isso, nome){
    isso.database.ref(isso.PATHLIST.path).set({
        nome,
        timeStamp: isso.firebase.database.ServerValue.TIMESTAMP,
        criador: {
            'nome': isso.usuarioDatabase.nome,
            'chave': isso.usuarioDatabase['.key']
        }
    }).then(snap => {
        var sessaoPatrulhaUsuario, objPadrao = {
                chave: snap.key,
                'nome': nome
            }

        if(!isso.PATHLIST){
            return
        }
        if(isso.PATHLIST.tipo == 'sessao'){
            //O usuário já está cadastrado em uma seção
            if(isso.usuarioDatabase.secao){
                return
            }
            sessaoPatrulhaUsuario = {
                'sessao': objPadrao
            }
        } else{
            if(isso.usuarioDatabase.patrulha){
                return
            }
            sessaoPatrulhaUsuario = {
                'patrulha': objPadrao
            }
        }

        isso.database.ref('usuario').document(isso.usuarioDatabase['.key']).update(sessaoPatrulhaUsuario)
    })
}
