<script>
import {mapGetters} from 'vuex'
import StCabecalhoSecao from './CabecalhoSecao.vue'
import StPanelRealizarPost from './PanelRealizarPost.vue'
import StPostsPanel from './PostsPanel.vue'
var vm = {
    firebase(){
        return {
            grupo: {
                source: this.database.ref('/grupo/'+this.$route.params.idGrupo),
                asObject: true,
                readyCallback(){
                    console.log('Ready Grupo', this.grupo)
                }
            },
            secao: {
                source: this.database.ref('/grupo/'+this.$route.params.idGrupo+'/secoes/')
                                        .orderByChild( "nome")
                                        .equalTo(this.$route.params.idSecao
                                        .replace('_', ' ')),
                asObject: false,
                readyCallback(){
                    console.log('Ready Secao', this.secao)
                }
            }
        }
    },
    components: {
        StCabecalhoSecao,
        StPanelRealizarPost,
        StPostsPanel
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'}),
        getGrupo(){
            if(this.grupo && this.grupo['.key']){
                console.log('getGrupo', this.grupo)
                return this.grupo
            }
            return false
        },
        getSecao(){
            if(this.secao[0] && this.secao[0]['.key']){
                console.log('getSecao', this.secao)
                return this.secao[0]
            }
            return false
        },
        ehDessaSecao(){
            if(!this.getSecao){
                return false
            }
            if(this.usuarioDatabase.secao.chave == this.getSecao['.key']){
                return true
            }
            return false
        }
    }
}
export default vm
</script>

<template>
    <div class="container area">
        <div v-if="!usuarioDatabase || !usuarioDatabase.grupo">
            <h1 class="text-center carregando">CARREGANDO...</h1>
        </div>
        <div v-else>
            <div class="row">
                <st-cabecalho-secao :secao="getSecao" :grupo="getGrupo"></st-cabecalho-secao>
            </div>
            <div v-if="ehDessaSecao" class="row">
                <st-panel-realizar-post :secao="getSecao"></st-panel-realizar-post>
            </div>
            <div class="row">
                <hr class="realizar-separator">
            </div>
            <div class="row">
                <st-posts-panel :secao="getSecao"></st-posts-panel>
            </div>
        </div>
    </div>
</template>

<style>
.area{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 40px;
  color: #eacf9b;
}
.realizar-separator{
    margin-bottom:30px;
}
</style>