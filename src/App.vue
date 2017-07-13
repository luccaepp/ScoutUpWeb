<script>
  import {EventBus} from './eventBus'
  import FuncoesFirebaseDatabase from './funcoesGlobais/firebase/funcoesDatabase'
export default{
  data(){
    return{
      firebase: this.$store.state.firebase
    }
  },
  created(){
    EventBus.$on('usuarioConectado', usuario =>{
      console.log('commitando o mudar usuario')
      this.$store.commit('MUDAR_USUARIO', usuario)
      console.log(usuario.uid)
      FuncoesFirebaseDatabase.prepararCommitDoChangeDoUsuarioDaDatabase(usuario.uid, this.firebase.database(), this.$store)

    })

  }

}
 
</script>

<template>
  <router-view v-bind:firebase="firebase"></router-view>
</template>




<style>
  body{
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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