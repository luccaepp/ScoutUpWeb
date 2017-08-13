<script>
import StComentarioBox from './ComentariosPanel/ComentarioBox.vue'
import StEscrevaUmComentarioPanelFooter from './ComentariosPanel/EscrevaUmComentarioPanelFooter.vue'
import _ from 'lodash' 
import {mapGetters} from 'vuex'


var vm = {
    data(){
        return {
            limitAtual: 3
        }
    },
    firebase(){
        return {
            comentarios: this.refComentarios
        }
    },
    props: ['pathParaOPost', 'ehDessaArea'],
    components: {
        StComentarioBox,
        StEscrevaUmComentarioPanelFooter
    },
    computed: {
        ...mapGetters({database : 'getDatabase'}),
        retornaComentariosDoPostFiltrados(){
            return this.comentarios 
                    ? _.orderBy(Object.keys(this.comentarios)
                        .map(key => this.comentarios[key]), 'timeStamp', 'desc') 
                    : []
        },
        refComentarios(){
            return this.database.ref(this.pathParaOPost+'/comentarios/').limitToLast(this.limitAtual)
        }
    },
    methods: {

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
                <template v-for="comentario in retornaComentariosDoPostFiltrados">
                    <st-comentario-box :pathParaOPost="pathParaOPost" 
                        :comentario="comentario"></st-comentario-box>
                </template>
            </div>
            <a class="pull-right text-verdinho" href="#">Mostrar mais...</a>
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
</style>