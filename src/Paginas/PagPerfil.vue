<script>
    import StTopBarLogado from './../layout/TopBars/TopBarLogado.vue'
    import StMain from './../layout/Perfil/Main.vue'
    import {EventBus} from './../eventBus'
    export default{
        components: {
            StTopBarLogado,
            StMain
        },
        beforeCreate(){
            document.body.className = 'home'
        }
    }

</script>
<template>
    <div>
        <st-top-bar-logado></st-top-bar-logado>
        <st-main></st-main>
    </div>

</template>

<style>
    body.home{
        background-image: url('../assets/paisagem-background.png')
    }
</style>