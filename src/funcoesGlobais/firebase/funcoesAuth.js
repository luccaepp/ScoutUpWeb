export default {
    retornaProvider(tipo, auth){
        switch(tipo){
            case 'facebook': return new auth.FacebookAuthProvider()
            case 'google': return new auth.GoogleAuthProvider()
            case 'twitter': return new auth.TwitterAuthProvider()
        }
    },
    montarObjUsuarioParaDatabaseComObjetoDoAuth(resultadoDoAuth, tipo){
        var nome, email, tipo, status, grupo, sessao, patrulha, baseMsgErr='Impossível adquirir o seguinte campo do provedor de autenticação: ';
        if(resultadoDoAuth.displayName){
            nome = resultadoDoAuth.displayName
        } else if(resultadoDoAuth.user){
            nome = resultadoDoAuth.user
        } else {
            console.error(baseMsgErr+'nome de usuário')
            return false
        }

        if(resultadoDoAuth.email){
            email = resultadoDoAuth.email
        } else{
            console.error(baseMsgErr+'email')
            return false
        }
        if(resultadoDoAuth.status){
            status = resultadoDoAuth.status
        } else{
            console.error(baseMsgErr+'status')
            return false
        }
        if(resultadoDoAuth.tipo){
            tipo = resultadoDoAuth.tipo
        } else{
            console.error(baseMsgErr+'tipo')
            return false
        }
        if(resultadoDoAuth.grupo){
            grupo = resultadoDoAuth.grupo
        } else{
            console.error(baseMsgErr+'grupo')
            return false
        }
        if(resultadoDoAuth.sessao){
            sessao = resultadoDoAuth.sessao
        } else{
            console.error(baseMsgErr+'sessao')
            return false
        }
        if(resultadoDoAuth.patrulha){
            patrulha = resultadoDoAuth.patrulha
        } else{
            console.error(baseMsgErr+'patrulha')
            return false
        }


        return {nome: nome, email: email, tipo: tipo, status:status, grupo: grupo, sessao:sessao, patrulha:patrulha}
  }
}
