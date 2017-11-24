export default {
    validar(novaAtividade){
        let mensagemErro = ""
        
        let tituloValido = !!novaAtividade.titulo && novaAtividade.titulo.length > 4,
            tipoValido = !!novaAtividade.tipo,
            materiaisValido = novaAtividade.materiais.length > 0,
            dataValido = !!novaAtividade.inicio && !!novaAtividade.termino && novaAtividade.termino > novaAtividade.inicio,
            localValido = !!novaAtividade.local,
            participantesValido = !!novaAtividade.participantes && novaAtividade.participantes.length > 0

        mensagemErro = !tituloValido
            ? "Título inválido, coloque mais caracteres."
            : !tipoValido
            ? "Selecione um tipo."
            : !materiaisValido
            ? "Selecione pelo menos um material."
            : !dataValido
            ? "Data inválida."
            : !localValido
            ? "Selecione um local."
            : !participantesValido
            ? "Adicione pelo menos um participante."
            : ""
        if(mensagemErro === "")
            return true

        return this.emitirAlert(mensagemErro)
    },
    emitirAlert(mensagemErro){
        alert(mensagemErro)
        return false
    }

}

