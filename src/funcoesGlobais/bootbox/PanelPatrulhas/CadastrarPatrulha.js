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
            
        } else if(nome.length < 5 || nome.length > 50){
            bootbox.alert('Erro! O nome da patrulha deve ter no mínimo 5 e no máximo 50 caracteres.')
            return
        } 
        else{
            console.log('nome: ', nome)
            InsercaoSecaoPatrulha(isso, nome)
        }   
    })
}