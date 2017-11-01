<script>
import StConquista from './PainelProgressao/Conquista.vue'
export default {
  components: {
    StConquista
  }
}
</script>

<template>
    <div class="panel panel-primary painel-progressao col-lg-5 col-lg-offset-1 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-trophy" aria-hidden="true"></i> Mural da Progressão
        </div>
        <div class="panel-body">
            <div v-masonry transition-duration="1s" item-selector=".item">
              <div v-masonry-tile class="item" v-for="item in 6">
                <st-conquista class="gutter-wrap"></st-conquista>
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
