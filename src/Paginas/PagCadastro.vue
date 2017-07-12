<script>
  import StTopBarDeslogado from './../layout/TopBars/TopBarDeslogado.vue'
  import StPainelCadastro from './../layout/Cadastro/PainelCadastro.vue'
  import StPainelLogin from './../layout/Cadastro/PainelLogin.vue'
  import {EventBus} from './../eventBus'


  export default {
    data(){
      return {
        auth: "",
        database: ""
      }
    },
    props: ['firebase'],
    components: {
      StTopBarDeslogado,
      StPainelCadastro,
      StPainelLogin
    },
    methods: {
      cadastrar(usuario){
          //Criando Usuário no Firebase Auth
          this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((snapshot) => {
            //Criando Usuário na Database
            this.criarUsuarioNaDatabase(usuario, snapshot.uid)     
            this.perfil()
          }).catch((erro) => {
            console.warn("Algo deu errado... "+erro.code+" "+erro.message)
          })
        
      },
      criarUsuarioNaDatabase(usuario, uid){
        this.database.ref('/usuario/'+uid+"/").set({nome: usuario.nome, email: usuario.email, tipo: usuario.tipoUsuario})
        console.info("Usuário Registrado na database com sucesso")
      }
      ,
      perfil(){
        this.$router.push('/perfil')
      },
      loginPersonalizado(provider, tipoUsuario){
        this.auth.signInWithPopup(provider).then(resultado => {
          
          var objUsuarioParaDatabase = montarObjUsuarioParaDatabaseComObjetoDoAuth(resultado.user, tipoUsuario);
          console.log(resultado)
          if(!objUsuarioParaDatabase){
            console.error('Erro: impossível montar todos os campos do usuário pelo provedor de autenticação')
            throw 'Erro: impossível montar todos os campos do usuário pelo provedor de autenticação'
          }

          this.criarUsuarioNaDatabase(objUsuarioParaDatabase, resultado.user.uid)
          //Router manda pra tela de perfil
          this.perfil()
        }).catch(erro => {
          switch(erro.code){
            case "auth/account-exists-with-different-credential": alert("O seu e-mail já está cadastrado em outro método de login. Tente novamente com outro provedor de autenticação.") ;break;
          }
          console.error("Algo deu errado... "+erro.code+" "+erro.message)
        })
      }
    },
    mounted(){
      this.auth = this.firebase.auth()
      this.database = this.firebase.database()

      //Tratamentos do Bus

      EventBus.$on('loginPersonalizado', data => {
        var tipoLogin = data.tipoLogin, tipoUsuario = data.tipoUsuario
        var provider = retornaProvider(tipoLogin, this.firebase.auth)
        this.loginPersonalizado(provider, tipoUsuario)

      })

      EventBus.$on('login', data => {
        this.auth.signInWithEmailAndPassword(data.email, data.senha).then(resultado => {
          console.info(resultado)
          this.perfil()
        }).catch(erro => {
          alert('Não foi possível autenticar o usuário. \nVerifique as as informações nos campos')
        })
      })

    }
  }

  //Funções sem RealTime
  function usuarioExistenteNaDatabase(usuario, database){
    database.ref('/usuario/'+usuario.uid)
  }
  function retornaProvider(tipo, auth){
        switch(tipo){
          case 'facebook': return new auth.FacebookAuthProvider()
          case 'google': return new auth.GoogleAuthProvider()
          case 'twitter': return new auth.TwitterAuthProvider()
        }
  }
  function montarObjUsuarioParaDatabaseComObjetoDoAuth(resultadoDoAuth, tipoUsuario){
    var nome, email, tipo, baseMsgErr='Impossível adquirir o seguinte campo do provedor de autenticação: ';
    if(resultadoDoAuth.displayName){
      nome = resultadoDoAuth.displayName
    } else if(resultadoDoAuth.user){
      nome = resultadoDoAuth.user
    } else {
      console.error(baseMsgErr+'nome de usuário')
      return false
    }

    if(resultadoDoAuth.email){
      email = resultadoDoAuth.email
    } else{
      console.error(baseMsgErr+'email')
      return false
    }

    return {nome: nome, email: email, tipoUsuario: tipoUsuario}
  }
    
</script>


<template>
  <div class="container-fluid">
  <st-top-bar-deslogado>
  </st-top-bar-deslogado>
  <st-painel-cadastro v-on:cadastrar="cadastrar">
  </st-painel-cadastro>
  <st-painel-login>
  </st-painel-login>
  </div>
   

</template>

<style>
  body{
    background-image: url(../assets/baloes.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

  .panel{
    padding-left: 0;
    padding-right: 0;
    margin-top:100px;
    opacity: .92;
  }

  .panel-body, .panel-heading{
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

