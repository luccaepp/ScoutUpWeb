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
        }, props:['displayNome'],
        methods:{
            displayGrupo(){
                //Caso o usuário ou a database sejam nulos, espere por eles...
                if(!this.usuario || !this.database){
                    this.grupo = 'Carregando...'
                    return;
                }
                /* -- Definindo Grupo -- */
                this.database.ref('usuario/'+this.usuario.uid+'/').once('value', snapshotUsuario => {
                    if(snapshotUsuario.child('grupo').exists()){
                        //O Grupo existe!!! Recuperando o UID do grupo que está salvo no usuário
                        this.database.ref('/usuario/'+this.usuario.uid+'/grupo').once('value', snapshotUIDGrupo => {
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
            },
            displaySessao(){
                //Caso o usuário ou a database sejam nulos, espere por eles...
                if(!this.usuario || !this.database){
                    this.grupo = 'Carregando...'
                    return;
                }
                /* -- Definindo Sessão -- */
                this.database.ref('usuario/'+this.usuario.uid+'/').once('value', snapshotUsuario => {
                    if(snapshotUsuario.child('sessao').exists()){
                        //A Sessão existe!!! Recuperando o UID da sessão que está salva no usuário
                        this.database.ref('/usuario/'+this.usuario.uid+'/sessao').once('value', snapshotUIDSessao => {
                            //Recuperando o nome da sessão de /sessao/uid/nome
                            this.database.ref('/sessao/'+snapshotUIDSessao.val()+'/nome').once('value', snapshotNomeSessao => {
                                this.sessao = snapshotNomeSessao.val()
                            })
                        })
                    } else{
                        //A sessão não existe
                        this.sessao = false
                    }
                })
            }
        },
        created(){
            EventBus.$on('transferirDatabase', database =>{
                this.database = database
                console.log('database transferida')
                this.displayGrupo()
                this.displaySessao()
            })
            EventBus.$on('usuarioConectado', usuario =>{
                this.usuario = usuario
                this.displayGrupo()
                this.displaySessao()
            })
            this.displayGrupo()
        }
    }
    //Funções Sem RealTime


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
                <p v-if="grupo" class="list-group-item-text">{{grupo}}</p>
                <p v-else><a href="#">Adicionar um grupo...</a></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Sessão:</h4>  
                <p v-if="sessao" class="list-group-item-text">{{sessao}}</p>
                <p v-else><a href="#">Adicionar uma sessão...</a></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">E-mail:</h4>  <p class="list-group-item-text">{{usuario.email}}</p>
                </li>
            </ul>

        </div>
    </div>
</template>