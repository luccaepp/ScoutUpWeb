<script>
import { mapGetters } from 'vuex'
import StCabecalhoGrupo from './CabecalhoGrupo.vue'
import StPanelInformacoesGrupo from './PanelInformacoesGrupo.vue'
import StPanelMembros from './PanelMembros.vue'
import StPanelSessoes from './PanelSessoes.vue'
var vm = {
    data(){
        return {
            grupo: ''
        }
    },
    firebase(){
        return {}
    },
    components: {
        StCabecalhoGrupo,
        StPanelInformacoesGrupo,
        StPanelMembros,
        StPanelSessoes
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase'}),
        getGrupo(){
            if(this.grupo){
                return this.grupo
            }
            return false
        }
    },
    watch: {
        'usuarioDatabase'(){
            if(this.usuarioDatabase){
                console.log('foi', this.usuarioDatabase)
                this.$bindAsObject('grupo', this.$store.state.database.ref('/grupo/'+this.usuarioDatabase.grupo+'/'), null, () => {console.log('foi')})
            }
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
                    <st-panel-informacoes-grupo :grupo="getGrupo"></st-panel-informacoes-grupo>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div class="col-xs-6 membros-box">
                        <div class="row">
                            <st-panel-membros></st-panel-membros>
                        </div>
                    </div>
                    <div class="col-xs-6 sessoes-box">
                        <div class="row">
                            <st-panel-sessoes></st-panel-sessoes>
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
</style>