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
          this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(snapshot => {
            usuario.senha = null

            var newUser = {
            tipo: usuario.tipo,
            nome: usuario.nome,
            email: usuario.email,
            grupo: null,
            sessao: null,
            patrulha: null,
            status: 'online'
                    }


            FuncoesFirebaseDatabase.criarUsuarioNaDatabase(this.database, newUser, snapshot.uid)
            this.perfil(snapshot.uid)
          }).catch((erro) => {
            console.warn("Algo deu errado... "+erro.code+" "+erro.message)
          })

      },
      perfil(idUsuario){
        this.$router.push('/usuario/'+idUsuario)
      },
      loginPersonalizado(provider, tipo){

        this.auth.signInWithPopup(provider).then(snapshot => {

          var user = snapshot.user
          var nome, email;

          if (user != null) {
            user.providerData.forEach(function (profile) {
              console.log("Sign-in provider: "+profile.providerId);
              console.log("  Provider-specific UID: "+profile.uid);
              nome = profile.displayName;
              email = profile.email;
              console.log("  Photo URL: "+profile.photoURL);
            });
          }


          var usuarioConsulta = FuncoesFirebaseDatabase.consultarUsuarioNaDatabase(this.database, user.uid)

          if(usuarioConsulta != null){

            var newUser = {
            tipo: tipo,
            nome: nome,
            email: email,
            grupo: null,
            sessao: null,
            patrulha: null,
            status: 'online'
            }
            FuncoesFirebaseDatabase.criarUsuarioNaDatabase(this.database, newUser, snapshot.user.uid)

          }
            this.perfil(snapshot.user.uid)

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
      EventBus.$on('loginPersonalizado', data => {
        var tipoLogin = data.tipoLogin, tipo = data.tipo
        var provider = FuncoesFirebaseAuth.retornaProvider(tipoLogin, this.firebase.auth)
        this.loginPersonalizado(provider, tipo)

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
