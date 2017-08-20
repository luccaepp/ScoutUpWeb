<script>
    import {mapGetters} from 'vuex'
    import StTopBarPrototipo from './TopBarPrototipo.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from '../../funcoesGlobais/firebase/funcoesDatabase'

    export default {
        firebase(){
            return {

            }
        },
        components:{
            StTopBarPrototipo
        },
        computed:{
            ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', usuario: 'getUsuario'}),
            displayUsuario(){
                console.log(this.usuarioDatabase)
                if(!this.$store.state.usuarioDatabase){
                    return 'Carregando...'
                }
                
                return this.$store.state.usuarioDatabase.nome
            },
            retornaLinkGrupo(){
                if(!this.usuarioDatabase){
                    return this.$route.path
                }
                var grupo = this.usuarioDatabase.grupo
                if(grupo){
                    return '/grupos/'+grupo
                } else{
                    return '/cadastroNaArea'
                }
            },
            retornaLinkSecao(){
                
                if(!this.usuarioDatabase){
                    return this.$route.path
                }
                var grupo = this.usuarioDatabase.grupo
                var secao = this.usuarioDatabase.secao
                if(!grupo || !secao){
                    return '/cadastroNaArea'
                }
                return '/grupos/'+grupo+'/secoes/'+(secao.nome).replace(' ', '_')



            }
        },
        methods: {
            logout(){
                this.$store.state.auth.signOut()
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
                <li><router-link :to="retornaLinkGrupo"><i class="fa fa-building" aria-hidden="true"></i> Grupo</router-link></li>
                <li><router-link :to="retornaLinkSecao"><i class="fa fa-object-group" aria-hidden="true"></i> Seção</router-link></li>
                <li><a href="#"><i class="fa fa-users" aria-hidden="true"></i> Patrulha</a></li>
            </ul>                                    
        </li>
        <li>
            <a href="#" id="a2"><i class="fa fa-free-code-camp" aria-hidden="true"></i> Atividades</a>
        </li>
    </ul>
    <template slot="lis-login">
        <li><router-link :to="'/usuarios/'+usuario.uid"><span class="glyphicon glyphicon-user"></span> {{displayUsuario}}</router-link></li>
        <li><a href="#" @click.prevent="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>       
    </template>
    </st-top-bar-prototipo>
    
</template>