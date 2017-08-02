<script>
  import {EventBus} from './eventBus'
  import FuncoesFirebaseDatabase from './funcoesGlobais/firebase/funcoesDatabase'
export default{
  data(){
    return{
      firebase: this.$store.state.firebase
    }
  },
  beforeCreate(){
    EventBus.$on('usuarioConectado', usuario =>{
      console.log('commitando o mudar usuario')
      this.$store.commit('MUDAR_USUARIO', usuario || false)
      console.log(usuario.uid)
      //FuncoesFirebaseDatabase.prepararCommitDoChangeDoUsuarioDaDatabase(usuario.uid, this.firebase.database(), this.$store)

    })
    EventBus.$on('usuarioDesconectado', () =>{
      var path = this.$route.path

     if (path !== '/cadastro' && path != '/') {
          this.$router.replace('/cadastro')
        }
    })
  }

}

</script>

<template>
  <router-view :firebase="firebase"></router-view>
</template>




<style>

  .container-main{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 50px;
  font-size: 18px;
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
