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
                var secao = this.usuarioDatabase.secao
                if(this.retornaLinkGrupo == '/cadastroNaArea' || !secao){
                    return '/cadastroNaArea'
                }
                return this.retornaLinkGrupo+'/secoes/'+secao.nome.replace(' ', '_')
            },
            retornaLinkPatrulha(){
                if(!this.usuarioDatabase){
                    return this.$route.path
                }
                var patrulha = this.usuarioDatabase.patrulha
                if(this.retornaLinkSecao == 'cadastroNaArea'){
                    return 'cadastroNaArea'
                }
                if(!patrulha){
                    return this.retornaLinkSecao
                }
                return this.retornaLinkSecao+'/patrulhas/'+patrulha.chave
            }
        },
        methods: {
            logout(){
                console.log('deslogando')
                this.$store.state.auth.signOut().then(()=>{
                })
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
                <li><router-link :to="retornaLinkPatrulha"><i class="fa fa-users" aria-hidden="true"></i> Patrulha</router-link></li>
            </ul>                                    
        </li>
        <li>
            <router-link to="/atividades" id="a2"><i class="fa fa-free-code-camp" aria-hidden="true"></i> Atividades</router-link>
        </li>
    </ul>
    <template slot="lis-login">
        <li><router-link :to="'/usuarios/'+usuario.uid"><span class="glyphicon glyphicon-user"></span> {{displayUsuario}}</router-link></li>
        <li><a href="#" @click.prevent="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>       
    </template>
    </st-top-bar-prototipo>
    
</template>