<script>
import { mapGetters } from 'vuex'
export default {
  props: ['ehDessaArea', 'post'],
  data(){
    return {
      atividade: null,
      local: null
    }
  },
  firebase(){
    return {
      atividade: {
        source: this.database.ref(`atividade/${this.post.chaveAtividade}`),
        asObject: true
        }
    }
  },
  computed: {
    ...mapGetters({database: 'getDatabase'})
  },
  watch: {
    atividade(){
      if(this.atividade['.key']){
        console.log('carregou ativPOST', this.atividade)
        this.local = this.atividade.local
      }
    }
  }
}
</script>

<template>
    <!-- PAINEL DO POST -->
  <div class="panel panel-post panel-transparent col-xs-12" v-if="atividade">
    <div class="panel-heading">
      <div class="row">
          <!-- Foto de Perfil do Usuário que realizou o Post -->
        <div class="row">
          <div class="col-xs-12 tit">
            <i class="fa fa-star" aria-hidden="true"></i>
            Atividade -
            {{post.titulo}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <p>Local:</p>
        <gmap-map
          v-if="local"
          :center="local"
          :zoom="14"
          map-type-id="hybrid"
          class="mapa"
          >
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fa-star{
  color: yellow;
}
.tit{
  font-size: 30px;
  font-family: claire;
}
.mapa{
  height: 260px;
  width: 290px;
}
</style>
