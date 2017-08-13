export default function(isso, nome){
    isso.database.ref(isso.PATHLIST.path).push({
        nome,
        timeStamp: isso.firebase.database.ServerValue.TIMESTAMP,
        criador: {
            'nome': isso.usuarioDatabase.nome,
            'chave': isso.usuarioDatabase['.key']
        }
    }).then(snap => {
        var secaoPatrulhaUsuario, objPadrao = {
                chave: snap.key,
                'nome': nome
            } 

        if(!isso.PATHLIST){
            return
        }
        if(isso.PATHLIST.tipo == 'secao'){
            //O usuário já está cadastrado em uma seção
            if(isso.usuarioDatabase.secao){
                return
            }
            secaoPatrulhaUsuario = {
                'secao': objPadrao
            }
        } else{
            if(isso.usuarioDatabase.patrulha){
                return
            }
            secaoPatrulhaUsuario = {
                'patrulha': objPadrao
            }
        }

        isso.database.ref('/usuario/'+isso.usuarioDatabase['.key']).update(secaoPatrulhaUsuario)
    })
}