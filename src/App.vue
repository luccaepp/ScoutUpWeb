<script>
  import * as firebase from 'firebase'
  import {EventBus} from './eventBus'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRvISTAPcm6puLII-_ZleiGmJD37--e80",
    authDomain: "scoutup-59cc7.firebaseapp.com",
    databaseURL: "https://scoutup-59cc7.firebaseio.com",
    projectId: "scoutup-59cc7",
    storageBucket: "scoutup-59cc7.appspot.com",
    messagingSenderId: "793313790543"
  }
  firebase.initializeApp(config)

  var logado = false
  var usuarioAutenticado = ''
  firebase.auth().onAuthStateChanged(usuario => {
    if(usuario){
      console.log('conectado')
      usuarioAutenticado = usuario
      logado = true
    } else{
      console.log('desconectado')
      usuarioAutenticado = ''
      logado = false
    }
  })
  
export default{
  data(){
    return{
      firebase: firebase
    }
  },
  methods: {

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