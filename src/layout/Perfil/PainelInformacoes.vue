<script>
    import {EventBus} from './../../eventBus'

    export default{
        data(){
            return {
                sessao: '',
                usuario: '',
                database: '',
                grupo: ''
            }
        },
        props:["userDatabase", "displayNome"],
        methods:{
            displayGrupo(){
                //Caso o usuário seja nulo, espere por ele...
                if(!this.usuario || !this.database){
                    this.grupo = 'Carregando...'
                    return;
                }
                /* -- Definindo Grupo e Sessão -- */
                this.database.ref('usuario/'+this.usuario.uid+'/').once('value', snapshotUsuario => {
                    if(snapshotUsuario.child('grupo').exists()){
                        //O Grupo existe!!! Recuperando o UID do grupo que está salvo no usuário
                        this.database.ref('/usuario/'+snapshotUsuario.key+'/grupo').once('value', snapshotUIDGrupo => {
                            //Recuperando o nome do grupo de /grupo/uid/nome
                            this.database.ref('/grupo/'+snapshotUIDGrupo.val()+'/nome').once('value', snapshotNomeGrupo => {
                                this.grupo = snapshotNomeGrupo.val()
                            })
                        })
                    } else{
                        //O grupo não existe
                        this.grupo = false
                    }
                })
            }
        },
        created(){
            EventBus.$on('transferirDatabase', database =>{
                this.database = database
                console.log('database transferida')
                this.displayGrupo()
            })
            EventBus.$on('usuarioConectado', usuario =>{
                this.usuario = usuario
                this.displayGrupo()
            })
            this.displayGrupo()
        }
    }


</script>


<template>
    <div class="panel panel-info col-lg-10 col-lg-offset-1 painel-fix-padding">
        <div class="panel-heading"><i class="fa fa-info-circle" aria-hidden="true"></i> Informações</div>
        <div class="panel-body">
            <ul class="list-group text-center">
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Nome:</h4>  <p class="list-group-item-text">{{displayNome}}</p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Grupo:</h4>  
                <p class="list-group-item-text">{{grupo}}</p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Sessão:</h4>  <p class="list-group-item-text">Os Magnatas</p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">E-mail:</h4>  <p class="list-group-item-text">email</p>
                </li>
            </ul>

        </div>
    </div>
</template>