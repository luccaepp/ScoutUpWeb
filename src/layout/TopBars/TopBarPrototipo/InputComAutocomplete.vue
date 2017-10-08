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
          opcoes: []
      }
  },
  watch: {
      usuarioBuscado(){
        let self = this
        this.firestore.collection('usuario').where('nome', '>=', toTitleCase(this.usuarioBuscado)).where('nome', '<', toTitleCase(comProximaLetra(this.usuarioBuscado))).get().then(snap =>{
            self.opcoes = []
            snap.forEach(usuario => {
                self.opcoes.push(usuario.data())
                console.log('pushou', comProximaLetra(self.usuarioBuscado))
            })
        })
      }
  }
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function comProximaLetra(my_string){
    return my_string.substring(0,my_string.length-1)+String.fromCharCode(my_string.charCodeAt(my_string.length-1)+1)
}
</script>

<template>
    <div class="root">
        <input type="text" class="form-control" v-model="usuarioBuscado"
        placeholder="Buscar Usuário">
        <box-opcoes :opcoes="opcoes" v-if="opcoes.length != 0"></box-opcoes>
    </div>
</template>
