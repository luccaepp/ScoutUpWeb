import insercaoSecaoPatrulha from '../../firebase/insercaoSecaoPatrulha'
export default function(isso){
        bootbox.prompt('Qual o nome da Seção a ser cadastrada?', nome => {
        //Tratando input vazio 
        if(nome === '') { 
            bootbox.dialog({
                message: 'Informe um nome para a seção!',
                buttons: {
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-warning',
                        callback(){}
                    },                            
                    confirmar: {
                        label: 'OK',
                        className: 'btn-success',
                        callback(){
                            isso.adicionarSecao()
                        }
                    }

                }
            })
            //usuário cancelou
        } else if(!nome){
            return
        }
        //Tratando inserção da seção
        else{
            insercaoSecaoPatrulha(isso, nome)
        }
    })
}
