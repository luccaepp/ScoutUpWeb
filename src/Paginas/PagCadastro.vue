<script>
  import StPainelCadastro from './../layout/Cadastro/PainelCadastro.vue'
  import StPainelLogin from './../layout/Cadastro/PainelLogin.vue'

  import { EventBus } from './../eventBus'
  import FuncoesFirebaseAuth from './../funcoesGlobais/firebase/funcoesAuth'
  import FuncoesFirebaseDatabase from './../funcoesGlobais/firebase/funcoesDatabase'
  import { mapGetters } from 'vuex'


  export default {
    data(){
      return {
        userExists: [],
        usuarioAtual: null
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
      ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase', firebase: 'getFirebase', auth: 'getAuth'})
    },
    methods: {
      cadastrarUsuarioComEmailESenha(usuario){
          this.usuarioAtual = usuario
          this.abrirModalCadastrarTipo(true)
      },
      perfil(idUsuario){
        if(this.usuarioDatabase != null){
              this.$router.push('/usuarios/'+idUsuario)
        }
      },
      abrirModalCadastrarTipo(Se_Eh_Email_E_Senha_True_Ou_Eh_Auth_Provider_False){
        EventBus.$emit('abrirModalCadastroTipo', Se_Eh_Email_E_Senha_True_Ou_Eh_Auth_Provider_False)
      }
    },
    mounted(){
      //Tratamentos do Bus
      console.log(this.database, this.firebase, this.auth)
    },
    beforeCreate(){
      document.body.className='cadastro'

      EventBus.$on('fecharModalCadastroTipo', tipo => {

        this.usuarioAtual.tipo = tipo
        let usuario = this.usuarioAtual
        //Criando Usuário no Firebase Auth
        this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(snapshot => {
            //Criando Usuário na Database
            FuncoesFirebaseDatabase.criarUsuarioNaDatabase(this, usuario, snapshot.uid)
            this.perfil(snapshot.uid)
        }).catch((erro) => {
          console.warn("Algo deu errado... "+erro.code+" "+erro.message)
        })

        //FIM EVENTBUS FECHAR_MODAL_CADASTRO_TIPO
      })
    }
  }
</script>


<template>
  <div class="container-fluid">
  <st-painel-cadastro @cadastrar="cadastrarUsuarioComEmailESenha">
  </st-painel-cadastro>
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
