<script>
import { EventBus } from './../../eventBus'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      radioText: '',
      isTipoCadastrado: false
    }
  },
  computed: {
    ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase',firebase: 'getFirebase', auth: 'getAuth'})
  },
  methods:{
    cadastrarTipo(tipo){
        this.database.ref('usuario/'+ this.usuarioDatabase['.key']).update({
          tipo: tipo
        }).then(()=> {
            this.isTipoCadastrado = true
            EventBus.$emit("fecharModalCadastroTipo")
          })
    }
  },
  created(){
    EventBus.$on("abrirModalCadastroTipo", ()=>{
      console.log("show modal tipo cadastro")
      $('#modal-cadastro-tipo').modal('show');
    })
    EventBus.$on("fecharModalCadastroTipo", ()=>{
      $('#modal-cadastro-tipo').modal('hide');
    })
    // queria fazer com que quando o modal fosse fechado ele automaticamente cadatraria como escoteiro, mas falhei

    // $('#modal-cadastro-tipo').on('hidden.bs.modal', ()=>{
    //   console.log("oi pessoal tsdasd")
    //   if(!this.isTipoCadastrado){
    //     this.cadastrarTipo('escoteiro')
    //   }
  // })

  }
}
</script>

<template>
  <div class="modal fade" id="modal-cadastro-tipo" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Voce é um?</h4> 
              </div>
              <div class="modal-body">
                 <form class="text-left col-xs-7">
            <label class="radio-inline" for="radioEscoteiroLogin"><input type="radio" id="radioEscoteiroLogin" checked name="radioUserLogin" value="escoteiro" v-model="radioText"> Escoteiro</label>

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
