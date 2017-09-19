<script>
  import {EventBus} from './eventBus'
  import FuncoesFirebaseDatabase from './funcoesGlobais/firebase/funcoesDatabase'
  import StTopBarDeslogado from './layout/TopBars/TopBarDeslogado.vue'
  import StTopBarLogado from './layout/TopBars/TopBarLogado.vue'
  import Chat from './layout/Chat/Main.vue'

  
export default{
  components: {
    StTopBarDeslogado,
    StTopBarLogado,
    Chat
  },
  data(){
    return{
      conectado: false,
      firebase: this.$store.state.firebase,
      pathsPermitidos: ['/cadastro', '/', '/o-projeto', '/sobre-nos']
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
  },
  created(){
    this.firebase.messaging().requestPermission()
      .then(() => console.info('Permissão concedida'))
      .catch(warn => console.warn('Permissão negada', warn))
  }
}

</script>

<template>
  <div>
    <st-top-bar-deslogado v-if="!conectado"></st-top-bar-deslogado>
    <st-top-bar-logado v-else></st-top-bar-logado>
    <router-view class="router" :firebase="firebase"></router-view>
    <chat v-if="conectado"></chat>
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

::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  background: transparent;
}
::-webkit-scrollbar-button {
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background: #846246;
  border: 22px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #56402e;
}
::-webkit-scrollbar-thumb:active {
  background: #493727;
}
::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 48px;
}

</style>
