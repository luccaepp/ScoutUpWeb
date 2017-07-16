<script>
    import StTopBarLogado from '../layout/TopBars/TopBarLogado.vue'
    import StMain from '../layout/CadastroArea/Main.vue'
    import {EventBus} from '../eventBus'
    var vm = {
        components: {
            StTopBarLogado,
            StMain
        },
        beforeCreate(){
            document.body.className = "cadastroArea"
        }
    }

    export default vm
</script>

<template>
    <div>
        <st-top-bar-logado></st-top-bar-logado>
        <st-main></st-main>
    </div>
</template>
<style>
    body.cadastroArea{
        background-image: url('../assets/grupo.jpg')
    }
</style>