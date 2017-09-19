<script>
    import {EventBus} from './../../eventBus'
    export default{
        data(){
            return {
                txtEmail: '',
                txtSenha: '',
                radioText: ''
            }
        },
        methods:{
            loginPersonalizado(tipoLogin){
                var tipoUsuario
                if(this.radioText){
                    tipoUsuario = this.radioText
                } else{
                    alert('Escolha o tipo de usuário: Escoteiro ou Escotista')
                    return
                }
                EventBus.$emit('loginPersonalizado', {tipoLogin: tipoLogin, tipoUsuario: tipoUsuario})
            },
            loginFacebook(){
                this.loginPersonalizado('facebook')
            },
            loginTwitter(){
                this.loginPersonalizado('twitter')
            },
            loginGoogle(){
                this.loginPersonalizado('google')
            },
            login(){
                EventBus.$emit('login', {email: this.txtEmail, senha: this.txtSenha})
            }
        },
        mounted(){
            $( "#radioEscoteiroLogin" ).trigger("click");
        }
    }
</script>

<template>
    <div class="col-lg-5 panel panel-info caixombra panel-auth">
        <div class="panel-heading panel-heading-login">
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3 img-container">
                    <img class="scout-image" src="../../assets/logo-azul.png" alt="Logo do ScoutUp!">
                </div>
            </div>
            <div class="row">
                <h2 class="col-xs-6 col-xs-offset-3 text-center" id="cad">FAÇA LOGIN</h2>
            </div>
        </div>
    <div class="panel-body panel-body-login">
      <div class="row">
        <div class="form-group text-center">
          <p class="text-left text-info">Login Usual</p>
          <input class="form-control" type="text" placeholder="Digite seu E-mail" v-model="txtEmail">
          <input type="password" class="form-control" placeholder="Digite sua Senha" v-model="txtSenha">
        <hr>
        <p class="text-left text-info">Login Personalizado</p>
        <form class="text-left col-xs-7">
            <span class="apenas">(Apenas se esta é sua primeira vez aqui)</span>
            <br>
            <span class="text-info"> Sou um: </span>

            <label class="radio-inline" for="radioEscoteiroLogin"><input type="radio" id="radioEscoteiroLogin" name="radioUserLogin" value="escoteiro" v-model="radioText"> Escoteiro</label>

            <label class="radio-inline" for="radioEscotistaLogin"><input type="radio" id="radioEscotistaLogin" name="radioUserLogin" value="escotista" v-model="radioText"> Escotista</label>


        </form>
            <div class="pull-right">
                <i class="fa fa-facebook-square" aria-hidden="true" @click="loginFacebook()"></i>
                <i class="fa fa-google-plus-square" aria-hidden="true" @click="loginGoogle()"></i>
                <i class="fa fa-twitter-square" aria-hidden="true" @click="loginTwitter()"></i>
            </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="btn-toolbar">
        <button class="btn btn-success pull-right" @click="login">Confirmar</button>
      </div>
    </div>
    </div>
</template>

<style scoped>
    .fa{
        font-size: 54px;
        margin-right:10px;
        cursor:pointer;
    }
    .fa-facebook-square{
        color:#3B5998;
    }
    .fa-google-plus-square{
        color:#EA4335;
    }
    .fa-twitter-square{
        color:#2AA9E0;
    }
    .apenas{
        color:#999999;
        font-size: 12px;
    }
    .panel{
        margin-bottom: 0;
    }
</style>
