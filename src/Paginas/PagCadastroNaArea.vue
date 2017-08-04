<script>
    import StMain from '../layout/CadastroArea/Main.vue'
    import {EventBus} from '../eventBus'
    var vm = {
        components: {
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
        <st-main></st-main>
    </div>
</template>
<style>
    body.cadastroArea{
        background-image: url('../assets/grupo.jpg')
    }
</style>