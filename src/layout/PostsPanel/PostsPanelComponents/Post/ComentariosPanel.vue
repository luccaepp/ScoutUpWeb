<script>
import StComentarioBox from './ComentariosPanel/ComentarioBox.vue'
import StEscrevaUmComentarioPanelFooter from './ComentariosPanel/EscrevaUmComentarioPanelFooter.vue'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import {EventBus} from '../../../../eventBus.js'


var vm = {
    data(){
        return {
            limitAtual: 3
        }
    },
    firebase(){
        return {
            comentarios: this.database.ref(this.pathParaOPost+'/comentarios/')
        }
    },
    props: ['pathParaOPost', 'ehDessaArea', 'post'],
    components: {
        StComentarioBox,
        StEscrevaUmComentarioPanelFooter
    },
    computed: {
        ...mapGetters({database : 'getDatabase'}),
        comentariosLimitados(){
            if(!this.post || !this.comentarios) return null
            return this.comentarios.slice(0, this.limitAtual)

        },
        limiteAtingido(){
            if(!this.comentariosLimitados){
                return false
            }
          console.log('limite', this.comentariosLimitados.length, this.limitAtual)
          return this.comentariosLimitados.length < this.limitAtual
        }
    }
}
export default vm
</script>

<template>
    <div class="panel panel-transparent panel-geral-comentarios">
        <div class="panel-heading">
            <div class="panel-title">
                <h4>Comentários</h4>
            </div>
        </div>
        <!-- Comentários Session -->
        <div class="panel-body">
            <div class="row">
                <div v-for="comentario in comentariosLimitados">
                     <st-comentario-box :pathParaOPost="pathParaOPost"
                        :comentario="comentario"></st-comentario-box>
                </div>
            </div>
            <span v-if="!limiteAtingido" @click="limitAtual += 5" class="pull-right text-verdinho mostrar">Mostrar mais...</span>
            <span v-if="limitAtual > 3" @click="limitAtual = 3"
                  class="pull-right text-verdinho mostrar">Mostrar menos...</span>
        </div>
        <st-escreva-um-comentario-panel-footer v-if="ehDessaArea" :pathParaOPost="pathParaOPost"></st-escreva-um-comentario-panel-footer>
    </div>
</template>
<style scoped>
.panel-geral-comentarios{
    background-color: rgba(115, 115, 115, .3);
    font-size:18px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin-bottom: 0;
}
.mostrar{
  cursor: pointer;
  margin: 5px;
}
.mostrar:hover{
  text-decoration: underline;
}
</style>
