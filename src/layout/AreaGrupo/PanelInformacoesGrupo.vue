<script>
import { mapGetters } from 'vuex'
var vm = {
    props: ['grupo'],
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase'})
    },
    methods: {
        retornaTimeStampFormatado(timeStamp){
            var data = new Date(timeStamp)
            return ("0" + data.getDate()).slice(-2) + '/' + ("0" + data.getMonth()).slice(-2) + '/' + data.getFullYear()
        }
    }
}
export default vm
</script>
<template>
    <div class="panel">
        <div class="panel-heading">
            <h2 class="text-center">Informações do Grupo</h2>
        </div>
        <div class="panel-body">
            <div class="info-escrita col-xs-9">
                <h3>NOME: <span>{{grupo.nome}}</span></h3>
                <h3>DATA DE CRIAÇÃO: <span>{{retornaTimeStampFormatado(grupo.timeStamp)}}</span></h3>
                <h3>CRIADOR: 
                    <span v-if="grupo.criador">{{grupo.criador.nome}}</span>
                    <span v-else>CARREGANDO...</span>
                </h3>
            </div>
            <div class="col-xs-2 area-foto">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</template>
<style scoped>
.panel{
    background-color: rgba(86,64,46,.2);
}
.panel-heading{
    border-bottom: 1px solid #B9C159;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}
.panel > .panel-heading > h2{
    color:#B9C159;
    font-family: claire, cursive, sans-serif;
}
.panel-body{
    padding: 50px;
    padding-top:0;
}
.info-escrita > h3{
    font-family: claire, cursive, sans-serif;
}
.area-foto{
    font-size: 130px;
}
</style>