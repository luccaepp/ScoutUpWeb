<script>
  import StTopBarDeslogado from './../layout/TopBars/TopBarDeslogado.vue'
  import StMain from './../layout/Inicial/Main.vue'
  export default {
    components: {
      StTopBarDeslogado,
      StMain
    },

  }
</script>



<template>
  <div class="container-fluid">
    <st-top-bar-deslogado>
    </st-top-bar-deslogado>
    <st-main></st-main>
  </div>
</template>


<style>
  body{
    background-image: url(../assets/sempre_alerta.jpg);
    min-width: 393px;
  }
</style>


