<script>
    export default{
        data(){
            return {
                txtNome: "",
                txtEmail: "",
                txtSenha: "",
                txtConfirmarSenha: "",
                radioText: ""
            }
        },
        methods: {
            cadastrar(){
                if(this.camposValidos()){

                    this.$emit('cadastrar', {nome: this.txtNome, email: this.txtEmail, senha: this.txtSenha, tipoUsuario: this.radioText})
                } else{
                    alert('Preencha todos os campos corretamente para se cadastrar')
                }
            },
            camposValidos(){
                let retorno = !(this.txtNome.length > 40 || this.txtNome.length <= 3 ||
                                this.txtSenha.length < 5 || this.txtSenha != this.txtConfirmarSenha
                                || (this.radioText != "escoteiro" && this.radioText != "escotista"));
                return retorno;
            }
        },
        mounted(){
            $( "#radioEscoteiro" ).trigger("click");
        }
    }
</script>

<template>
    <div class="col-lg-8 col-lg-offset-2 panel panel-warning caixombra panel-auth">
        <div class="panel-heading panel-heading-cadastro">
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3 img-container">
                    <img class="scout-image" src="../../assets/logo_scoutup_maior.png" alt="Logo do ScoutUp!">
                </div>
            </div>
            <div class="row">
                <h2 class="col-xs-6 col-xs-offset-3 text-center" id="cad">Cadastre-se</h2>
            </div>
        </div>
    <div class="panel-body panel-body-cadastro">
      <div class="row">
        <form>
            <p>Sou um: </p>

            <label class="radio-inline" for="radioEscoteiro"><input type="radio" id="radioEscoteiro" name="radioUser" value="escoteiro" v-model="radioText"> Escoteiro</label>

            <label class="radio-inline" for="radioEscotista"><input type="radio" id="radioEscotista" name="radioUser" value="escotista" v-model="radioText"> Escotista</label>
        </form>
        <div class="form-group">
          <input v-model="txtNome" class="form-control" type="text" placeholder="Digite seu Nome">
          <input v-model="txtEmail" class="form-control" type="text" placeholder="Digite seu E-mail">
          <input v-model="txtSenha" type="password" class="form-control" placeholder="Digite sua Senha">
          <input v-model="txtConfirmarSenha" type="password" class="form-control" placeholder="Confirme sua Senha">
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="btn-toolbar">
        <button class="btn btn-success pull-right" @click="cadastrar">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel{
    margin-bottom: 0;
}
</style>
