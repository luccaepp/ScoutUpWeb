<script>
import { EventBus } from './../../eventBus'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      radioText: 'escoteiro',
      isTipoCadastrado: false,
      Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False: null
    }
  },
  computed: {
    ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase',firebase: 'getFirebase', auth: 'getAuth'})
  },
  methods:{
    cadastrarTipo(tipo){
      if(this.Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False)
        EventBus.$emit("fecharModalCadastroTipo", tipo)
        else
          EventBus.$emit("tipoUsuarioAuthProviderSelecionado", tipo)

    }
  },
  created(){
    EventBus.$on("abrirModalCadastroTipo", Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False => {
      console.log('ehhhhh', Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False)
      this.Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False = Se_Eh_Email_E_Senha_True_Ou_Se_Eh_Auth_Provider_False
      console.log("show modal tipo cadastro")
      $('#modal-cadastro-tipo').modal('show');
    })
    EventBus.$on("fecharModalCadastroTipo", ()=>{
      $('#modal-cadastro-tipo').modal('hide');
    })
    EventBus.$on("tipoUsuarioAuthProviderSelecionado", ()=>{
      $('#modal-cadastro-tipo').modal('hide');
    })
    // queria fazer com que quando o modal fosse fechado ele automaticamente cadatraria como escoteiro, mas falhei

  }
}
</script>

<template>
  <div class="modal fade" id="modal-cadastro-tipo" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Voce é um:</h4>
              </div>
              <div class="modal-body">
                 <form class="text-left col-xs-7">
            <label class="radio-inline" for="radioEscoteiroLogin"><input type="radio" id="radioEscoteiroLogin" name="radioUserLogin" value="escoteiro" v-model="radioText"> Escoteiro</label>

            <label class="radio-inline" for="radioEscotistaLogin"><input type="radio" id="radioEscotistaLogin" name="radioUserLogin" value="escotista" v-model="radioText"> Escotista</label>

        </form>
        <br>
              </div>
              <div class="modal-footer">
                <button @click="cadastrarTipo(radioText)" class="btn btn-success">Enviar</button>
              </div>
          </div>
      </div>
  </div>
</template>


<style>

</style>
