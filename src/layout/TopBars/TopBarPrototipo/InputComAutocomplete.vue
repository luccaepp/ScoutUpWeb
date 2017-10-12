<script>
import {mapGetters} from 'vuex'
import BoxOpcoes from './InputComAutucomplete/BoxOpcoes.vue'
export default {
  components: {
      BoxOpcoes
  },
  computed: {
      ...mapGetters({firestore: 'getFirestore'})
  },
  data(){
      return {
          usuarioBuscado: '',
          opcoes: [],
          focused: false
      }
  },
  watch: {
      usuarioBuscado(){
        if(!this.usuarioBuscado){
            this.opcoes = []
            return
        }
        let self = this
        this.firestore.collection('usuario').where('nome', '>=', toTitleCase(this.usuarioBuscado)).where('nome', '<', toTitleCase(comProximaLetra(this.usuarioBuscado))).get().then(snap =>{
            self.opcoes = []
            snap.forEach(usuario => {
                self.opcoes.push({chave: usuario.id, data: usuario.data()})
                console.log('pushou', usuario)
            })
        })
      }
  },
  methods: {
      blured(){
          this.opcoes = []
      },
      irParaPerfil(usuario){
        this.opcoes = []
        this.usuarioBuscado = ''
        this.$router.push('/usuarios/'+usuario.chave)
      }
  }
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function comProximaLetra(string){
    return string.substring(0,string.length-1)+String.fromCharCode(string.charCodeAt(string.length-1)+1)
}
</script>

<template>
    <div class="root">
        <input @blur="blured" type="text" class="form-control" v-model="usuarioBuscado"
        placeholder="Buscar Usuário">
        <box-opcoes @opcaoSelecionada="irParaPerfil" :opcoes="opcoes"></box-opcoes>
    </div>
</template>
