<script>
  import StPainelCadastro from './../layout/Cadastro/PainelCadastro.vue'
  import StPainelLogin from './../layout/Login/PainelLogin.vue'
  import {EventBus} from './../eventBus'
  import FuncoesFirebaseAuth from './../funcoesGlobais/firebase/funcoesAuth'
  import FuncoesFirebaseDatabase from './../funcoesGlobais/firebase/funcoesDatabase'
  import { mapGetters } from 'vuex'


  export default {
    data(){
      return {
        userExists: []
      }
    },
    firebase(){
      return {

      }
    },
    components: {
      StPainelCadastro
    },
    computed: {
      ...mapGetters({database: 'getDatabase', firebase: 'getFirebase', auth: 'getAuth'})
    },
    methods: {
      cadastrarUsuarioComEmailESenha(usuario){
          //Criando Usuário no Firebase Auth
          this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(snapshot => {
            //Criando Usuário na Database
            FuncoesFirebaseDatabase.criarUsuarioNaDatabase(this.database, usuario, snapshot.uid)
            this.perfil(snapshot.uid)
          }).catch((erro) => {
            console.warn("Algo deu errado... "+erro.code+" "+erro.message)
          })

      },
      perfil(idUsuario){
        this.$router.push('/usuarios/'+idUsuario)
      },
      beforeCreate(){
        document.body.className='cadastro'
      }
  }




</script>


<template>
  <div class="container-fluid">
  <st-painel-cadastro v-on:cadastrar="cadastrarUsuarioComEmailESenha">
  </st-painel-cadastro>
  <st-painel-login>
  </st-painel-login>
  </div>


</template>

<style>
  body{
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  body.cadastro{
    background-image: url(../assets/baloes.jpg);
  }

  .img-container{
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

  .panel-auth{
    padding-left: 0;
    padding-right: 0;
    margin-top:100px;
    opacity: .92;
  }

  .panel-body-cadastro, .panel-heading-cadastro,
   .panel-body-login, .panel-heading-login{
    padding: 40px;
    padding-bottom: 0;
  }

  .form-group > input{
    margin-bottom:10px;
  }
  #cad{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-transform: uppercase;
    margin-top: 20px;
  }

  .scout-image{
    width: 165px;
    height: 100px;
  }


</style>
