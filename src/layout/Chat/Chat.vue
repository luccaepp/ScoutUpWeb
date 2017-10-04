<script>
import {mapGetters} from 'vuex'
import timeStampFormatter from '../../funcoesGlobais/timeStamp/timeStamp'

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
    enviarMensagem(){
      if(!this.txtMensagem)
        return
      let mensagem = {
          nome: this.auth.currentUser.displayName,
          chave: this.auth.currentUser.uid,
          texto: this.txtMensagem.trim(),
          timeStamp: this.firebase.database.ServerValue.TIMESTAMP
      }

      this.conversaRef.push(mensagem)
      this.mensagem = ''
      this.txtMensagem = ''
    },
    carregarMensagens(){
      this.conversaRef.off()
      this.conversaRef.on('child_added', snapshot =>{
        this.mensagens.push(snapshot)
      })
    },
    ehDesseUsuario(msg){
      return msg.chave == this.usuarioDatabase['.key']
    },
    formatTS(ts){
      return timeStampFormatter.retornaTimeStampFormatado(ts)
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
  <div class="panel" v-if="usuarioDatabase">
    <div class="panel-heading">
      <i class="fa fa-user-circle" aria-hidden="true"></i>
      {{amigo.nome}}
      <button @click="$emit('fecharChat')" type="button" class="close" data-dismiss="modal">&times;</button>
    </div>
    <div class="panel-body">
      <ul class="messages-container col-lg-10">
        <li class="message-box" v-for="msg in mensagens">
          <div :class="{'message-wrapper-direita' : ehDesseUsuario(msg), 'message-wrapper-esquerda' : !ehDesseUsuario(msg)}">
            <template v-if="ehDesseUsuario(msg)">
              <div class="textoBox-direita">
                <div class="textoBox-body">{{msg.texto}}</div>
                <div class="textoBox-footer">
                  <p class="horario horario-left">
                    <span class="pull-left">você - {{formatTS(msg.timeStamp)}}</span>
                  </p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="textoBox-esquerda">
                <div class="textoBox-body">{{msg.texto}}</div>
                  <div class="textoBox-footer">
                    <p class="horario horario-right">
                      <span class="pull-right">{{formatTS(msg.timeStamp)}}</span>
                    </p>
                  </div>
                </div>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel-footer">
      <div class="input-group">
        <input @keyup.enter="enviarMensagem()" type="text" v-model="txtMensagem" class="form-control">
        <span class="input-group-btn">
          <button class="btn btn-default" @click="enviarMensagem()">Enviar</button>
        </span>
    </div>
  </div>
  </div>
</template>

<style>
.horario{
  display: flex;
  margin-left: 0px;
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 12px;
}
.horario-left{
  align-self: flex-start;
}
.horario-right{
  align-self: flex-end;
}
.textoBox-direita{
  display: row;
  flex-flow: row;
  flex-wrap: wrap;
  width: 200px;
  float: left;
}
.textoBox-esquerda{
  display: row;
  flex-flow: row;
  flex-wrap: wrap;
  text-align: right;
  width: 180px;
  float: right;
}
.textoBox-body{
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  word-break: break-word;
  width: auto;
}
.textoBox-footer{
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: claire;
}
.avatar{
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  max-width: 25%;
}

.messages-container{
  height: 100%;
  width: 100%;
  list-style: none;
  overflow-y: scroll;
}

.message-wrapper-esquerda, .message-wrapper-direita{
  color: #EACF9B;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
}

.message-wrapper-esquerda{
  background-color: #56402E;
}

.message-wrapper-direita{
  background-color: #47723E;
}

.message-wrapper-esquerda::before{
  box-sizing: border-box;
  width: 0;
  height: 0;
  content: "";
  top: -10px;
  left: -21px;
  position: relative;
  border-style: solid;
  border-width: 15px 15px 15px 15px;
  border-color: #56402E transparent transparent transparent;
}
.message-wrapper-direita::after{
  box-sizing: border-box;
  width: 0;
  height: 0;
  content: "";
  top: -10px;
  left: 21px;
  position: relative;
  border-style: solid;
  border-width: 15px 15px 15px 15px;
  border-color: #47723E transparent transparent transparent;
}
</style>


<style scoped>
.panel-footer{
  bottom:0;
}

.panel-body{
  height: 205px;
  width: 100%;
}
.panel{
  background-color: rgb(234,207,155);
  position: fixed;
  width: 300px;
  height: 300px;
  right: 220px;
  bottom: 0px;
  margin-bottom: 10px;
  z-index: 6;
  padding: 0;
}
.panel-heading{
  color: #EACF9B;
  font-family: claire;
  font-size: 20px;
  background-color: #56402E;
  margin: -1px;
}
.close{
  color: #EACF9B;
  opacity: .8;
}
.close:hover{
  opacity: .5;
}
</style>
