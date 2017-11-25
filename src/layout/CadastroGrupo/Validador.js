export default {
    validar(grupo){
        let mensagemErro = ""
        
        let nomeValido = !!grupo.nome && grupo.nome.length > 4,
            estadoValido = !!grupo.estado,
            cidadeValida = !!grupo.cidade

        mensagemErro = !nomeValido
            ? "Nome inválido, coloque mais caracteres."
            : !estadoValido
            ? "Selecione um estado."
            : !cidadeValida
            ? "Selecione uma cidade."
            : ""


        return mensagemErro === "" ? true : this.emitirAlert(mensagemErro)
    },
    emitirAlert(mensagemErro){
        alert(mensagemErro)
        return false
    }

}

