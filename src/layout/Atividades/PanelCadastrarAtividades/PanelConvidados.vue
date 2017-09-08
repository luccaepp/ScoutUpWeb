<script>
import FormGrupos from './PanelConvidados/FormGrupos.vue'
import FormSecoes from './PanelConvidados/FormSecoes.vue'

export default {
    components: {
        FormGrupos,
        FormSecoes
    },
    data(){
        return {
            convidados: [],
            tipoConv: 'grupo'
        }
    },
    methods: {
        adicionarSecao(data){
            let secao = data.secao
            this.convidados.push({
                tipo: 'secao',
                nome: secao.nome,
                chave: secao['.key'],
                chaveGrupo: data.chaveGrupo
            })
        },
        adicionarGrupo(grupo){
            //Retire todas as seções que pertencem a esse grupo dos convidados
            this.convidados
                .filter(conv => conv.chaveGrupo == grupo['.key'])
                .forEach(secaoFilha => this.convidados
                    .splice(this.convidados
                        .indexOf(secaoFilha), 1))
            this.convidados.push({
                tipo: 'grupo',
                chave: grupo['.key'],
                nome: grupo.nome
            })
        },
        removerConvidado(convKey){
            this.convidados.splice(this.convidados.indexOf(this.convidados.filter(c => c.chave == convKey)[0]), 1)
        }
    },
    watch: {
        convidados(){
            this.$emit('atualizarParticipantes', this.convidados)
        }
    }
}
</script>
<template>
    <div>
        <!-- Panel -->
        <div class="panel panel-info panel-convidados">
            <div class="panel-heading">
                <label>Participantes</label>
            </div>
            <!-- Panel Body -->
            <div class="panel-body">
                <div class="row">
                    <div class="list-group">
                        <template v-for="convidado in convidados">
                            <div class="list-group-item">{{convidado.nome}}</div>
                        </template>
                        <div id="addPart" class="list-group-item list-group-item-success" data-toggle="modal" data-target="#modalAddConv">
                            + Adicionar Participantes
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modalAddConv" role="dialog">
            <div class="modal-dialog">
            
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Adicione Participantes</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <p>Adicionar: </p>
                        <label class="radio-inline"><input type="radio" value="grupo" name="optTipoConv" v-model="tipoConv">Grupo</label>
                        <label class="radio-inline"><input type="radio" value="secao" name="optTipoConv" v-model="tipoConv">Seção</label>
                    </div>
                    <div class="row">
                        <form-grupos @removerConvidado="removerConvidado" :convidados="convidados" @adicionarGrupo="adicionarGrupo" v-if="tipoConv == 'grupo'"></form-grupos>
                        <form-secoes @removerConvidado="removerConvidado" :convidados="convidados" @adicionarSecao="adicionarSecao" v-else-if="tipoConv == 'secao'"></form-secoes>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
            </div>
            
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-body{
    height: 300px;
}
</style>
<style>
#addPart{
    cursor: pointer;
}
#addPart:hover{
    text-decoration:underline;
}
.modal-body{
    padding: 30px;
}
</style>


