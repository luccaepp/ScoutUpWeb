<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['pathParaOComentario'],
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'})
    },
    methods: {
        excluirComentario(){
            console.log('excluindo o post...', this.pathParaOComentario)
            this.database.ref(this.pathParaOComentario).remove();
        }
    }
}
export default vm
</script>
<template>
    <!-- DROPDOWN DAS OPÇÕES DO POST -->
    <div class="dropdown col-xs-1 col-lg-1">
        <span class="dropdown-toggle" type="button" data-toggle="dropdown">
            <span class="glyphicon glyphicon-chevron-down">
            </span>
        </span>
    <ul class="dropdown-menu dropdown-menu-right menu-opt-post" role="menu">
        <li @click="excluirComentario()" role="presentation">
            <span class="item-dropdown" role="menuitem" tabindex="-1">
                <i class="fa fa-times" aria-hidden="true"></i> Excluir
            </span>
        </li>
    </ul>
    </div>
</template>

<style scoped>
li{
    cursor: pointer;
}
li:hover{
    text-decoration: underline;
    background-color: #846246;
}
</style>

<style>
.menu-opt-post{
    margin-top: 10px;
    padding: 5px;
}
.glyphicon-chevron-down{
    color:#eacf9b!important;
}
.dropdown-menu{
    border: 1px solid #eacf9b;
}
.divider{
    background-color: #eacf9b!important;
}
</style>
