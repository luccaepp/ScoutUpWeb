<script>
  import { EventBus } from './eventBus'
  import FuncoesFirebaseDatabase from './funcoesGlobais/firebase/funcoesDatabase'
  import StTopBarDeslogado from './layout/TopBars/TopBarDeslogado.vue'
  import StTopBarLogado from './layout/TopBars/TopBarLogado.vue'
  import Chat from './layout/Chat/Main.vue'
  import { mapGetters } from 'vuex'
  import ModalCadastroTipo from './layout/Cadastro/ModalTipoCadastro.vue'


export default{
  components: {
    StTopBarDeslogado,
    StTopBarLogado,
    ModalCadastroTipo,
    Chat
  },
  data(){
    return{
      conectado: false,
      firebase: this.$store.state.firebase,
      pathsPermitidos: ['/cadastro','/login', '/', '/o-projeto', '/sobre-nos', '/confirmarTipoUsuario']
    }
  },
  beforeCreate(){
    bootbox.setLocale('br')
    EventBus.$on('usuarioConectado', usuario =>{
      console.log('commitando o mudar usuario')
      this.$store.commit('MUDAR_USUARIO', usuario || false)
      console.log(usuario.uid)
      this.conectado = true

    })
    EventBus.$on('usuarioDesconectado', () =>{
      var path = this.$route.path
      this.conectado = false
     if (this.pathsPermitidos.indexOf(path) == -1) {
          this.$router.replace('/cadastro')
        }
    })

    this.$router.beforeEach((to, from, next) => {
      console.log("nhanhanah")
      if(this.usuarioDatabase){
        console.log("lelelel", to)
        if(this.pathsPermitidos.indexOf(to.path) == -1){
          console.log("alo rapaziada")
          if(!this.usuarioDatabase.tipo){
            console.log('login poooooooooo')
            return next('/confirmarTipoUsuario')
          }
        }
      }
      if(this.pathsPermitidos.indexOf(to.path) == 0 || this.pathsPermitidos.indexOf(to.path) == 1){
        return next(!this.conectado)
      }
      return next()
    })

  },
  computed: {
    ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', usuario: 'getUsuario'})
  },
  watch: {
    usuarioDatabase(){
      if(this.usuarioDatabase && this.usuarioDatabase['.key']){
        EventBus.$emit('usuarioDatabasePreenchido', this.usuarioDatabase)
      }
    },
    '$route.path'(){

    }
  }
}

</script>

<template>
  <div>
    <st-top-bar-deslogado v-if="!conectado"></st-top-bar-deslogado>
    <st-top-bar-logado v-else></st-top-bar-logado>
    <router-view class="router" :firebase="firebase"></router-view>
    <chat v-if="conectado"></chat>
    <modal-cadastro-tipo :v-if="usuarioDatabase"></modal-cadastro-tipo>
  </div>
</template>




<style>
@media(max-width: 768px){
  .router{
    margin-top:35vh;
  }
}
@media(min-width: 769px){
  .router{
    margin-top:15vh;
  }
}

.container-main{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 50px;
  font-size: 18px;
}

h1.carregando{
    color:#B9C159;
    font-family: claire, Helvetica, sans-serif;
    font-size: 90px;
}

  body{
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
  }
  /*ScrollBar customizada*/

body::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  background: transparent;
}
body::-webkit-scrollbar-button {
  width: 1px;
  height: 1px;
}
body::-webkit-scrollbar-thumb {
  background: #846246;
  border: 22px none #ffffff;
  border-radius: 50px;
}
body::-webkit-scrollbar-thumb:hover {
  background: #56402e;
}
body::-webkit-scrollbar-thumb:active {
  background: #493727;
}
body::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 48px;
}

</style>
