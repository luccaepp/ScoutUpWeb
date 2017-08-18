<script>
import StPanelGrupos from './PanelGrupos.vue'
import {mapGetters} from 'vuex'
    export default {
      data(){
        return {
          secoesAtuais: []
        }
      },
      components: {
        StPanelGrupos
      },
        firebase: {

        },
        computed: {
            ...mapGetters({usuarioDatabase: 'getUsuarioDatabase'})
        },
        methods: {
          grupoSelecionado(grupo){
            console.log(grupo)
            this.secoesAtuais = grupo.secoes
          }
        }
    }
</script>


<template>
    <div class="container container-main">
        <div class="row" v-if="!usuarioDatabase">
            <div class="col-xs-12">
                <h1 class="carregando text-center">CARREGANDO...</h1>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-xs-12">
              <st-panel-grupos v-if="secoesAtuais == false" @grupoSelecionado="grupoSelecionado"></st-panel-grupos>

            </div>
        </div>
    </div>

</template>


<style>
table.table-grupos, .panel-grupos > .panel-body{
    color:#eacf9b;
    background-color:#56402E;

}
table.table-grupos{
  font-family: claire, Helvetica, sans-serif;
}
table.table-grupos > thead > tr > th{
  font-size: 28px;
}
table.table-grupos > tbody{
  font-size: 24px;
}
table.table-grupos > tbody > tr:hover{
  background-color:rgba(234,207,155,.92);
  color:#56402E;
  cursor: pointer;
}

.panel-grupos{
  background-color: transparent;
}
.panel-grupos > .panel-heading{
  background-color:rgba(234,207,155,.92);
  color:#56402E;
}
.panel-grupos > .panel-footer{
  background-color:transparent;
}
</style>
