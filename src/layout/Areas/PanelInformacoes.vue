<script>
import { mapGetters } from 'vuex'
import FormatadorDeTimeStamp from '../../funcoesGlobais/timeStamp/timeStamp'
var vm = {
    props: ['area'],
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase'})
    },
    methods: {
        retornaTimeStampFormatado(timeStamp){
            return FormatadorDeTimeStamp.retornaTimeStampFormatado(timeStamp)
        }
    }
}
export default vm
</script>
<template>
    <div class="panel">
        <div class="panel-heading">
            <h2 class="text-center">Informações</h2>
        </div>
        <div class="panel-body">
            <div class="info-escrita col-xs-9">
                <h3><i class="fa fa-pencil" aria-hidden="true"></i> NOME: <span>{{area.nome}}</span></h3>
                <h3><i class="fa fa-calendar" aria-hidden="true"></i> DATA DE CRIAÇÃO: <span>{{retornaTimeStampFormatado(area.timeStamp)}}</span></h3>
                <h3><i class="fa fa-hand-o-up" aria-hidden="true"></i> CRIADOR: 
                    <span v-if="area.criador">{{area.criador.nome}}</span>
                    <span v-else>CARREGANDO...</span>
                </h3>
                <h3 v-if="area.cidade && area.estado">
                    <i class="fa fa-map-marker" aria-hidden="true"></i> CIDADE: {{area.cidade}} / {{area.estado}}
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