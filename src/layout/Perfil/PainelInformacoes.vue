<script>
    import {EventBus} from './../../eventBus'
    import state from '../../store/state'
    import firebase from '../../funcoesGlobais/firebase/centralFirebase.js'

    var vm = {
        firebase: {

        },
        data(){
            return {
                grupo: '',
                sessao: ''
            }
        },
        props:['displayNome'],
        watch: {
            retornaUsuarioDatabase(novo, velho){
                displayGrupo(novo, this)
                displaySessao(novo, this)
            }
        },
        computed:{
            retornaUsuarioDatabase(){
                return this.$store.state.usuarioDatabase
            }
        }
    }

//     //Funções Separadas que geraram loop infinito como computed//
function displayGrupo(usuarioDatabase, vm){
    if(usuarioDatabase && usuarioDatabase.grupo){
        vm.$bindAsObject('grupo', firebase.database().ref('/grupo/'+usuarioDatabase.grupo))
    }
}
function displaySessao(usuarioDatabase, vm){

    if(usuarioDatabase && usuarioDatabase.sessao){
        vm.$bindAsObject('sessao', firebase.database().ref('/sessao/'+usuarioDatabase.sessao))
            console.log(vm)
    }
}


export default vm
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
                <p v-if="grupo" class="list-group-item-text">{{grupo.nome}}</p>
                <p v-else><a href="/cadastroNaArea">Adicionar um grupo...</a></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Sessão:</h4>  
                <p v-if="sessao" class="list-group-item-text">{{sessao.nome}}</p>
                <p v-else><a href="/cadastroNaArea">Adicionar uma sessão...</a></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">E-mail:</h4>  
                <p class="list-group-item-text">
                    <span v-if="$store.state.usuario">{{$store.state.usuario.email}}</span>
                    <span v-else>Carregando...</span>
                </p>
                </li>
            </ul>

        </div>
    </div>
</template>