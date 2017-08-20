<script>
import { mapGetters } from 'vuex'
import StCabecalhoGrupo from './CabecalhoGrupo.vue'
import StPanelInformacoes from '../Areas/PanelInformacoes.vue'
import StPanelMembros from '../Areas/PanelMembros.vue'
import StPanelSessoes from './PanelSessoes.vue'

var vm = {
    firebase(){
        return {
            grupo: {
                source: this.database.ref('/grupo/'+this.$route.params.id),
                asObject: true,
                readyCallback(){
                    console.log('Ready Grupo', this.grupo)
                }
            }
        }
    },
    components: {
        StCabecalhoGrupo,
        StPanelInformacoes,
        StPanelMembros,
        StPanelSessoes
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
        ehEscotistaDoGrupo(){
            return this.usuarioDatabase.tipo == 'escotista' && this.usuarioDatabase.grupo.key == this.grupo.key
        }
    }
}

export default vm
</script>

<template>

    <div class="container area" v-else>
        <div v-if="!usuarioDatabase || !usuarioDatabase.grupo">
            <h1 class="text-center carregando">CARREGANDO...</h1>
        </div>
        <div v-else>
            <div class="row">
                <st-cabecalho-grupo :grupo="getGrupo"></st-cabecalho-grupo>
            </div>
            <div class="row">
                <hr class="realizar-separator">
            </div>
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <st-panel-informacoes :area="getGrupo"></st-panel-informacoes>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div class="col-xs-6 membros-box">
                        <div class="row">
                            <st-panel-membros :ehEscotistaDaArea="ehEscotistaDoGrupo" class="panel-eq-height" 
                                tipoArea="grupo" :area="getGrupo"></st-panel-membros>
                        </div>
                    </div>
                    <div class="col-xs-6 sessoes-box">
                        <div class="row">
                            <st-panel-sessoes class="panel-eq-height" :ehEscotistaDoGrupo="ehEscotistaDoGrupo" 
                                :grupo="getGrupo"></st-panel-sessoes>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<style scoped>
.membros-box{
    right:10px;
}
.sessoes-box{
    left:10px;
}
.area{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 40px;
  color: #eacf9b;
}
.realizar-separator{
    margin-bottom:30px;
}
.panel-eq-height{
    height: 250px;
    overflow:scroll;
}
.panel-eq-height::-webkit-scrollbar-thumb{
    background-color: #9bd4ef;
}
</style>
