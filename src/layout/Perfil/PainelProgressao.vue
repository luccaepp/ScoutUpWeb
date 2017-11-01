<script>
import StConquista from './PainelProgressao/Conquista.vue'

const urlINI = '../../assets/icones_progressao/'

export default {
  components: {
    StConquista
  },
  data(){
    return {
      imgs: [
        urlINI + 'esporte.png'
      ]
    }
  }
}
</script>

<template>
    <div class="panel panel-primary painel-progressao col-lg-5 col-lg-offset-1 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-trophy" aria-hidden="true"></i> Mural da Progressão
        </div>
        <div class="panel-body">
          <h5 class="text-center">Especialidades</h5>
            <div v-masonry transition-duration="1s" item-selector=".item">
              <div v-masonry-tile class="item" v-for="url in imgs">
                <st-conquista :urlIMG="url" class="gutter-wrap"></st-conquista>
              </div>
            </div>

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
</style>
