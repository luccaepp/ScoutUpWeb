<script>
import StComentarioBox from './ComentariosPanel/ComentarioBox.vue'
var vm = {
    components: {
        StComentarioBox
    }
}
export default vm
</script>

<template>
    <div class="panel panel-transparent panel-geral-comentarios">
        <div class="panel-heading">
            <div class="panel-title">
                <h4>Comentários</h4>
            </div>
        </div>
        <!-- Comentários Session -->
        <div class="panel-body">
            <div class="row">
                <st-comentario-box></st-comentario-box>
            </div>
            <a class="pull-right text-verdinho" href="#">Mostrar mais...</a>
        </div>

    </div>
</template>
<style>
    
</style>