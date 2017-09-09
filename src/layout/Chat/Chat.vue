<script>
import {mapGetters} from 'vuex'

var vm = {
  firebase(){
    return {
      mensagens: this.conversaRef
    }
  },
    data(){
    return{
      txtMensagem: "",
    }
  },
  props:['conversaRef', 'amigo'],
  methods:{
    enviarMensagem: function(){
      let mensagem = {
          nome: this.auth.currentUser.displayName,
          chave: this.auth.currentUser.uid,
          texto: this.txtMensagem.trim(),
          timeStamp: this.firebase.database.ServerValue.TIMESTAMP
      }
      
      this.conversaRef.push(mensagem)
      this.mensagem = ""
    },
    carregarMensagens: function(){
      this.conversaRef.off()
      this.conversaRef.on('child_added', snapshot =>{
        this.mensagens.push(snapshot)
      })
    }
  },
  computed:{
    ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', auth: 'getAuth', database: 'getDatabase', usuario: 'getUsuario',
                            firebase: 'getFirebase'})
  }

}
export default vm
</script>

<template>
  <div class="panel panel-default" id="chat" v-if="usuarioDatabase">
    <div class="panel-heading">
      <i class="fa fa-user-circle" aria-hidden="true"></i> 
      {{amigo.nome}}
      <button @click="$emit('fecharChat')" type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
    <div class="panel-body">
      <div class="messages-container col-lg-10">
        <div v-for="msg in mensagens">
          <div class="message-container">
            <div class="spacing"><div class="pic"></div></div>
            <div class="message">{{msg.texto}}</div>
            <div class="name">{{msg.nome}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="input-group">
        <input type="text" v-model="txtMensagem" class="form-control">
        <span class="input-group-btn">
          <button class="btn btn-default" @click="enviarMensagem()">Enviar</button>
        </span>
    </div>
  </div>
</template>

<style scoped>
#chat{
  /* background-color: #56402E; */
  opacity: 0.8;
  position: fixed;
  width: 300px;
  height: 300px;
  right: 220px;
  bottom: 0px;
}
.messages-container{
  height: 80%;
  width: 100%;
}
.panel-footer{
  bottom:0;
}

.panel-body{
  height: 205px;
  width: 100%;
}
.panel{
  margin-bottom: 0;
  z-index: 6;
}
</style>