
<script>
import {mapGetters} from 'vuex'
import Chat from './Chat.vue'

var vm = {
  components:{
    Chat
  },
  firebase(){
    return { }
  },
  watch:{
    usuarioDatabase() {
      if(this.usuarioDatabase){
        this.$bindAsArray('amigos', this.database.ref("/usuario/"+this.usuarioDatabase['.key']+"/amigos"))
        this.$bindAsArray('usuarioConversas', this.database.ref("/usuario/"+this.usuarioDatabase['.key']+"/conversas"))
      }
      this.$bindAsArray('conversas', this.database.ref("conversas"))
    }
  },
  data(){
    return {
      mostrarChat: false,
      conversaSelecionada: null,
      chaveConversa: null,
      amigoSelecionado: null,
      amigos: null,
      amigosOnline:null,
      usuarioConversas: null,
      conversas: null
    }
  },
  methods: {
    checkSignedInWithMessage() {
      if (this.auth.currentUser) {
        return true;
      }
    },
    conversaJaExiste(chaveAmigo){
      let isCriado = false;
      this.$firebaseRefs.usuarioConversas.on('value', snapshot =>{
        snapshot.forEach(childSnap => {
          console.log(childSnap.val())
          if(childSnap.val().outroUser === chaveAmigo){
            isCriado = true;
            this.chaveConversa = childSnap.val().chave
          }
        });
      })
      console.log(isCriado)
      return isCriado
    },
    abrirChat(amigo){
      console.log("amigo",amigo)
      console.log("chave amigo",amigo.chave)
      if(!this.conversaJaExiste(amigo.chave)){
        console.log("conversas", this.$firebaseRefs.conversas)
        var conversaRef = this.$firebaseRefs.conversas.push()
        this.chaveConversa = conversaRef.key
        this.database.ref("usuario/"+this.usuarioDatabase['.key']+"/conversas").push({"chave": this.chaveConversa, "outroUser": amigo.chave})
        this.database.ref("usuario/"+amigo.chave+"/conversas").push({"chave": this.chaveConversa, "outroUser": this.usuarioDatabase['.key']})
      }
      console.log("conversasRef", conversaRef)
      console.log("chaveconversa", this.chaveConversa)
      console.log("conversas", this.$firebaseRefs.conversas.child(this.chaveConversa))
      this.conversaSelecionada = this.$firebaseRefs.conversas.child(this.chaveConversa)
      this.amigoSelecionado = amigo
      this.mostrarChat = !this.mostrarChat
    }
  },
  computed: {
    ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', auth: 'getAuth', database: 'getDatabase', usuario: 'getUsuario',
                            firebase: 'getFirebase'}),
    getCountAmigos(){
      if(this.amigos && this.amigos != null){
        return this.amigos.length
      }
    }
  }
}
export default vm

</script>

<template>
<div v-if="usuarioDatabase" class="root">
  <div data-toggle="collapse" data-target="#corpo-friendlist" class="text-center friendlist-minimizado">
      Lista de Amigos
    <span class="badge">{{ getCountAmigos }}</span>
  </div>
  <div id="corpo-friendlist" class="collapse">
    <div class="list-group">
      <li v-for="amigo in amigos" class="item-lista list-group-item" @click="abrirChat(amigo)">
          <i v-if="amigo.status == 'online'" class="fa fa-circle text-success" aria-hidden="true"></i> 
          <i v-else-if="amigo.status == 'offline'" class="fa fa-circle text-danger" aria-hidden="true"></i>
          {{ amigo.nome }}
      </li>
  </div>
  </div>
  <chat @fecharChat="mostrarChat = false" v-if="mostrarChat" :amigo="amigoSelecionado" :conversaRef="conversaSelecionada"></chat>
</div>
</template>


<style>

.friendlist-minimizado{
  background-color: #56402E;
  height: 30px;
  position: fixed;
  bottom: 0;
  right: 15px;
  width: 200px;
  padding: 5px;
  color: white;
  z-index: 5;
  border-radius: 5px;
  cursor: pointer;
}

.item-lista{
  background-color: #eacf9b ;
  color: black;
  cursor: pointer;
}
#corpo-friendlist{
  background-color: transparent;
  max-height: 500px;
  position: fixed;
  border-radius: 15px 15px 0px  0px !important ;
  bottom: 10px;
  right: 15px;
  width: 200px;
  color:white;
}
</style>
