<script>
    import StTopBarLogado from './../layout/TopBars/TopBarLogado.vue'
    import StMain from './../layout/Perfil/Main.vue'
    import {EventBus} from './../eventBus'
    export default{
        components: {
            StTopBarLogado,
            StMain
        },
        props: ["firebase"],
        data(){
            return {
                auth: '',
                database: '',
                usuario: ''
            }
        },
        mounted(){
            //Configurando as variáveis do Firebase
            this.auth = this.firebase.auth()
            this.database = this.firebase.database()
            EventBus.$emit('transferirDatabase', this.database)
            //Configurando o login no EventBus
            //Handlers para login e logout
            this.usuario = this.auth.currentUser
            EventBus.$on('usuarioConectado', usuario => {
                this.usuario = usuario
            })
            EventBus.$on('usuarioDesconectado', () =>{
                //TODO handler que desconecta usuário surte efeito aqui
            })
        }
    }

</script>
<template>
    <div>
        <st-top-bar-logado></st-top-bar-logado>
        <st-main></st-main>
    </div>

</template>