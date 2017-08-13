<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['post', 'pathParaOPost'],
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'})
    },
    methods: {
        excluirPost(){
            console.log('excluindo o post...', this.pathParaOPost)
            this.database.ref(this.pathParaOPost).remove();
        }
    }
}
export default vm
</script>
<template>
    <!-- DROPDOWN DAS OPÇÕES DO POST -->
    <div class="dropdown col-xs-1 col-xs-offset-4 col-sm-offset-6 col-lg-1 col-lg-offset-5">
        <span class="dropdown-toggle" type="button" data-toggle="dropdown">
            <span class="glyphicon glyphicon-chevron-down">
            </span>
        </span>
    <ul class="dropdown-menu dropdown-menu-right menu-opt-post" role="menu">
        <li role="presentation">
            <span class="item-dropdown" role="menuitem" tabindex="-1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</span>
        </li>
        <li role="presentation" class="divider"></li>
        <li @click="excluirPost()" role="presentation">
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
