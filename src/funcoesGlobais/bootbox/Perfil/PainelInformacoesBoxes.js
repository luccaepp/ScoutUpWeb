export default {
    dialogOpcoesGrupo(router){
        bootbox.dialog({
            message: 'Você gostaria de:',
            buttons: {
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-warning'
                },
                btnCriarGrupo: {
                    label: 'Criar um novo Grupo',
                    className: 'btn-success',
                    callback(){
                        router.push('/cadastrarGrupo')
                    }
                },
                btnEntrarNoGrupo: {
                    label: 'Entrar em um Grupo',
                    className: 'btn-primary',
                    callback(){
                        router.push('/cadastroNaArea')
                    }
                }
            }
        })
    }
}