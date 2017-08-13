import InsercaoSecaoPatrulha from '../../firebase/insercaoSecaoPatrulha'
export default function(isso){
    bootbox.prompt('Qual o nome da Patrulha a ser cadastrada?', nome => {
        //Tratando input vazio
        if(nome === ''){
            bootbox.dialog({
                message: 'Informe um nome para a patrulha!',
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
                            isso.adicionarPatrulha()
                        }
                    }

                }
            })
            //usuário clicou em cancelar
        } else if(!nome){
            return
            //tratando inserção da patrulha
        } else{
            InsercaoSecaoPatrulha(isso, nome)
        }   
    })
}