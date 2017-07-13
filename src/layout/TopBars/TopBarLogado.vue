<script>
    import StTopBarPrototipo from './TopBarPrototipo.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from '../../funcoesGlobais/firebase/funcoesDatabase'

    export default {
        components:{
            StTopBarPrototipo
        },
        computed:{
            displayUsuario(){
                console.log(this.$store.state.usuarioDatabase)
                if(!this.$store.state.usuarioDatabase){
                    return 'Carregando...'
                }
                
                return this.$store.state.usuarioDatabase.nome
            }

        }
    }

</script>
<template>
    <st-top-bar-prototipo>
        <ul slot="lis-navbar" class="nav navbar-nav list-inline">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-object-ungroup" aria-hidden="true"></i> Minhas Áreas <span class="caret"></span></a>
                <ul class="dropdown-menu caixombra">
                <li><a href="#"><i class="fa fa-building" aria-hidden="true"></i> Grupo</a></li>
                <li><a href="area-sessao.html"><i class="fa fa-object-group" aria-hidden="true"></i> Sessão</a></li>
                <li><a href="#"><i class="fa fa-users" aria-hidden="true"></i> Patrulha</a></li>
            </ul>                                    
        </li>
        <li>
            <a href="#" id="a2"><i class="fa fa-free-code-camp" aria-hidden="true"></i> Atividades</a>
        </li>
    </ul>
    <template slot="lis-login">
        <li><a href="#" @click="acessarPerfil()"><span class="glyphicon glyphicon-user"></span> {{displayUsuario}}</a></li>
        <li><a href="index.html"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>       
    </template>
    </st-top-bar-prototipo>
    
</template>