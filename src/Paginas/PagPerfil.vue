<script>
    import StTopBarLogado from './../layout/TopBars/TopBarLogado.vue'
    import StMain from './../layout/Perfil/Main.vue'
    import {EventBus} from './../eventBus'
    export default{
        components: {
            StTopBarLogado,
            StMain
        },
        data(){
            return {
            }
        },
        beforeRouteEnter: (to, from, next) => {
            //Configurando o login no EventBus
            //Handlers para login e logout
            EventBus.$on('usuarioDesconectado', () =>{
                //this.$route.router.go()
            })
            next()
        }
    }

</script>
<template>
    <div>
        <st-top-bar-logado></st-top-bar-logado>
        <st-main></st-main>
    </div>

</template>