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
        console.log(usuario)
        
          //Criando Usuário no Firebase Auth
          this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((snapshot) => {
            console.log(snapshot)
            //Criando Usuário na Database
            this.database.ref('/usuario/'+usuario.tipoUsuario+"/"+snapshot.uid+"/").set({nome: usuario.nome, email: usuario.email})
            console.info("Usuário Registrado com sucesso")
            this.$router.push('/perfil')
            
          }).catch((erro) => {
            console.warn("Algo deu errado... "+erro.code+" "+erro.message)
          })

          
        
        
      }
    },
    mounted(){
      this.auth = this.firebase.auth();
      this.database = this.firebase.database();

    }
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

