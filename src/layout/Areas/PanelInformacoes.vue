<script>
import { mapGetters } from 'vuex'
import FormatadorDeTimeStamp from '../../funcoesGlobais/timeStamp/timeStamp'
var vm = {
    props: ['area', 'ehEscotistaDaArea', 'ehDessaArea'],
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
            <div class="info-escrita col-xs-12 text-center">
                <h3><i class="fa fa-pencil" aria-hidden="true"></i> NOME: <span>{{area.nome}}</span></h3>
                <h3><i class="fa fa-calendar" aria-hidden="true"></i> DATA DE CRIAÇÃO: <span>{{retornaTimeStampFormatado(area.timeStamp)}}</span></h3>
                <h3><i class="fa fa-hand-o-up" aria-hidden="true"></i> CRIADOR: 
                    <span v-if="area.criador">{{area.criador.nome}}</span>
                    <span v-else><i class="fa fa-spinner fa-spin"></i></span>
                </h3>
                <h3 v-if="area.cidade && area.estado">
                    <i class="fa fa-map-marker" aria-hidden="true"></i> CIDADE: {{area.cidade}} / {{area.estado}}
                </h3>
                <button @click="$emit('excluirArea')" v-if="ehEscotistaDaArea" class="btn btn-danger pull-left"><i class="fa fa-trash" aria-hidden="true"></i> Excluir Área</button>
                <button @click="$emit('desinscreverse')" v-if="ehDessaArea" class="btn btn-danger pull-left"><i class="fa fa-chain-broken" aria-hidden="true"></i> Desinscrever-se</button>
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
    padding-top:0;
}
.info-escrita > h3{
    font-family: claire, cursive, sans-serif;
}
.btn-danger{
    margin-left: 2px;
    margin-bottom: 2px;
}
</style>