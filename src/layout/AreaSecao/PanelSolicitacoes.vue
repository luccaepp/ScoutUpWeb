<script>
import {mapGetters} from 'vuex'
var vm = {
    firebase(){
        return {
            solicitacoes: this.database.ref('/grupo/'+this.$route.params.idGrupo+'/secoes/'+this.secao['.key']+'/solicitacoes')
        }
    },
    props: ['secao'],
    computed: {
        ...mapGetters({database: 'getDatabase'})
    },
    methods: {
        aprovarSolicitacao(sol){
            var refUsuario = this.database.ref('/usuario/').child(sol.usuario.chave)
            refUsuario.update({
                grupo: this.$route.params.idGrupo,
                secao: {
                    nome: this.secao.nome,
                    chave: this.secao['.key']
                },
                solicitacaoDeEntradaEmSecao: null
            }).then(snap => {
                this.reprovarSolicitacao(sol)
            })
        },
        reprovarSolicitacao(sol){
            this.$firebaseRefs.solicitacoes.child(sol['.key']).remove()
        }
    }
}
export default vm
</script>

<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <i class="fa fa-plus" aria-hidden="true"></i> Solicitações de Entrada
        </div>
        <div class="panel-body">
            <ul class="list-group">
                <li v-for="solicitacao in solicitacoes" class="list-group-item list-group-item-info li">
                    <i aria-hidden="true" class="fa fa-user-circle"></i>
                    {{solicitacao.usuario.nome}}
                    <div class="pull-right btn-toolbar divAprovarReprovar">
                        <button @click="reprovarSolicitacao(solicitacao)" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                        <button @click="aprovarSolicitacao(solicitacao)" class="btn btn-success">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.divAprovarReprovar > button{
    font-size: 10px;
}
.li{
    font-size: 18px;
}
</style>