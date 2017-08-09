<script>
import { mapGetters } from 'vuex'
import StMain from '../layout/AreaGrupo/Main.vue'
var vm = {
    components: {
        StMain
    },
    computed: {
        ...mapGetters({database: 'getDatabase', firebase: 'getFirebase', usuarioDatabase: 'getUsuarioDatabase'})
    }
}

export default vm
</script>

<template>
    <st-main></st-main>
</template>

<style>
body{
    background-image: url(../assets/paisagem-background.png);
}
hr{
    height: 1px;
    background-color: #eacf9b;
    margin-bottom: 0;
}

.panel-title{
    font-family: claire;

}
.panel-header::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  background: #56402e;
}
.panel-header{
    background-color: #493727;

}
.panel-footer{
    background-color: transparent;
}
</style>
