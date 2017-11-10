<script>
import StConquista from './PainelProgressao/Conquista.vue'
import StModalProgressao from './PainelProgressao/ModalProgressao.vue'

import ImagensEspecialidades from './PainelProgressao/imagensEspecialidades'
import ImagensEspecial from './PainelProgressao/imagensEspecial'


export default {
  components: {
    StConquista,
    StModalProgressao
  },
  data(){
    return {
      imgsEspecialidades: ImagensEspecialidades,
      imgsEspecial: ImagensEspecial,
      itemAtivo: ''
    }
  },
  methods: {
    mostrarProgressao(bundle){
      this.itemAtivo = bundle
      console.log(bundle.nome)
    }
  }
}
</script>

<template>
    <div class="panel panel-primary painel-progressao col-xs-12 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-trophy" aria-hidden="true"></i> Mural da Progressão
        </div>
        <div class="panel-body">
          <h4 class="text-center">Especialidades</h4>
            <div v-masonry fit-width="true" transition-duration="1s" item-selector=".itemES">
              <div v-masonry-tile class="itemES" v-for="infoIMG in imgsEspecialidades">
                <st-conquista tipo="itemES" @mostrarProgressao="mostrarProgressao" :borda="true" :infoIMG="infoIMG" class="gutter-wrap"></st-conquista>
              </div>
            </div>

            <h4 class="text-center">Interesse Especial</h4>
            <div v-masonry fit-width="true" transition-duration="1s" item-selector=".itemE">
              <div v-masonry-tile class="itemE" v-for="infoIMG in imgsEspecial">
                <st-conquista tipo="itemE" @mostrarProgressao="mostrarProgressao" :infoIMG="infoIMG" class="gutter-wrap"></st-conquista>
              </div>
            </div>
            <st-modal-progressao :itemAtivo="itemAtivo"></st-modal-progressao>
        </div>
    </div>
</template>

<style scoped>
    .fa-certificate{
        color: gold;
    }
    .botoes-progressao{
        position: relative;
        top: 10px;
    }
    .gutter-wrap{
      margin-left: 5px;
      margin-top: 5px;
    }
    .panel-body{
      overflow: scroll;
    }
</style>
