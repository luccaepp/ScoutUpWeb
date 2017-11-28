<script>
    import {mapGetters} from 'vuex'
    import StTopBarPrototipo from './TopBarPrototipo.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from '../../funcoesGlobais/firebase/funcoesDatabase'
    import Status from './../../status/status'

    export default {
        data(){
            return {
                dropdownExpandido: false
            }
        },
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
                let grupo = this.usuarioDatabase.grupo
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
                let secao = this.usuarioDatabase.secao
                if(this.retornaLinkGrupo == '/cadastroNaArea' || !secao){
                    return '/cadastroNaArea'
                }
                return this.retornaLinkGrupo+'/secoes/'+secao.nome.replace(' ', '_')
            },
            retornaLinkPatrulha(){
                if(!this.usuarioDatabase){
                    return this.$route.path
                }
                let patrulha = this.usuarioDatabase.patrulha
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

                this.$store.state.auth.signOut()
            },
            menuExpandido(){
                if(!this.$refs.dropdownMenuExpandido){
                    this.dropdownExpandido = false
                    return
                }
                this.dropdownExpandido = this.$refs.dropdownMenuExpandido.className.split(' ').indexOf('open') == -1
            }
        },
        created(){
            this.$router.beforeEach((to, from, next) => {this.dropdownExpandido = false;next();})
        }
    }

</script>
<template>
    <st-top-bar-prototipo :dropdownExpandido="dropdownExpandido" :logado="true">
        <ul slot="lis-navbar" class="nav navbar-nav list-inline">
        <template v-if="usuarioDatabase">
            <template v-if="usuarioDatabase.grupo">
                <li ref="dropdownMenuExpandido" @click="menuExpandido()" class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-object-ungroup" aria-hidden="true"></i> 
                        Minhas Áreas 
                        <span class="caret">
                        </span>
                    </a>
                        <ul class="dropdown-menu caixombra">
                        <li class="hovTopbar"><router-link :to="retornaLinkGrupo"><i class="fa fa-building" aria-hidden="true"></i> Grupo</router-link></li>
                        <li class="hovTopbar" v-if="usuarioDatabase.secao"><router-link :to="retornaLinkSecao"><i class="fa fa-object-group" aria-hidden="true"></i> Seção</router-link></li>
                        <li class="hovTopbar" v-if="usuarioDatabase.patrulha"><router-link :to="retornaLinkPatrulha"><i class="fa fa-users" aria-hidden="true"></i> Patrulha</router-link></li>
                    </ul>
                </li>
                <li>
                    <router-link to="/atividades" id="a2"><i class="fa fa-free-code-camp" aria-hidden="true"></i> Atividades</router-link>
                </li>
            </template>
            <template v-else>
                <li>
                    <router-link to="/o-projeto" id="a1" class="a">O Projeto</router-link>
                </li>
                <li>
                    <router-link to="/sobre-nos" id="a2" class="a">Sobre Nós</router-link>
                </li>
            </template>
        </template>
        <template v-else>
            <div class="spin-box">
                <i class="fa fa-spinner fa-spin"></i>
            </div>  
        </template>
    </ul>
    <template slot="lis-login">
        <li><router-link :to="'/usuarios/'+usuario.uid"><span class="glyphicon glyphicon-user"></span> {{displayUsuario}}</router-link></li>
        <li><a href="#" @click.prevent="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
    </template>
    </st-top-bar-prototipo>

</template>

<style scoped>
li.hovTopbar > a:hover{
    background-color: rgba(33, 33, 33, .2);
}
.fa-spinner{
    color: #E1CF9B;
    font-size: 40px;
    margin-top: 10px;
    margin-left: 15px;
}
.spin-box{
    text-align: center;
}
</style>

