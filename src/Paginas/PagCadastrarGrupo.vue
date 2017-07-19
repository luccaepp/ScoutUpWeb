<script>
  import StTopBar from '../layout/TopBars/TopBarLogado.vue'
  import StMain from '../layout/CadastroGrupo/Main.vue'
  var vm = {
    components: {
      StTopBar,
      StMain
    },
    beforeCreate(){
      document.body.className = "cadastroGrupo"
    }
  }

  export default vm
</script>
<template>
  <div>
    <st-top-bar></st-top-bar>
    <st-main></st-main>
  </div>
</template>

<style>
  body.cadastroGrupo{
        background-image: url('../assets/grupo.jpg')
    }
</style>
