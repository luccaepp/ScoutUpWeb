<script>
  import StMain from '../layout/CadastroGrupo/Main.vue'
  var vm = {
    components: {
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
    <st-main></st-main>
  </div>
</template>

<style>
  body.cadastroGrupo{
        background-image: url('../assets/grupo.jpg')
    }
</style>
