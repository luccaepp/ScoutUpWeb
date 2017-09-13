<script>
  import StPainelCadastro from './../layout/Cadastro/PainelCadastro.vue'
  import StPainelLogin from './../layout/Cadastro/PainelLogin.vue'
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
      StPainelCadastro,
      StPainelLogin
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
      loginPersonalizado(provider, tipoUsuario){
        this.auth.signInWithPopup(provider).then(resultado => {
          //Se o usuário ainda não existe, crie ele
          this.$bindAsArray('userExists', this.database.ref('/usuario/'+resultado.user.uid), null,
           snap => {
             if(!snap.exists()){
              var objUsuarioParaDatabase = FuncoesFirebaseAuth.montarObjUsuarioParaDatabaseComObjetoDoAuth(resultado.user, tipoUsuario)
              if(!objUsuarioParaDatabase){
                console.error('Erro: impossível montar todos os campos do usuário pelo provedor de autenticação')
                throw 'Erro: impossível montar todos os campos do usuário pelo provedor de autenticação'
              }

              FuncoesFirebaseDatabase.criarUsuarioNaDatabase(this.database, objUsuarioParaDatabase, resultado.user.uid)
           }
           this.perfil(resultado.user.uid)
        })


          //Router manda pra tela de perfil

        }).catch(erro => {
          switch(erro.code){
            case "auth/account-exists-with-different-credential": alert("O seu e-mail já está cadastrado em outro método de login. Tente novamente com outro provedor de autenticação.") ;break;
          }
          console.error("Algo deu errado... "+erro.code+" "+erro.message)
        })
      }
    },
    mounted(){
      //Tratamentos do Bus
      console.log(this.database, this.firebase, this.auth)
      EventBus.$on('loginPersonalizado', data => {
        var tipoLogin = data.tipoLogin, tipoUsuario = data.tipoUsuario
        var provider = FuncoesFirebaseAuth.retornaProvider(tipoLogin, this.firebase.auth)
        this.loginPersonalizado(provider, tipoUsuario)

      })

      EventBus.$on('login', data => {
        this.auth.signInWithEmailAndPassword(data.email, data.senha).then(resultado => {
          console.info(resultado)
          this.perfil(data.key)
        }).catch(erro => {
          alert('Não foi possível autenticar o usuário. \nVerifique as as informações nos campos')
          console.error(erro)
        })
      })

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
