<script>
export default {
    data(){
        return {
            convidados: [],
            tipoConv: ''
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
                <p>Adicionar: </p>
                <label class="radio-inline"><input type="radio" name="optTipoConv" v-model="tipoConv">Grupo</label>
                <label class="radio-inline"><input type="radio" name="optTipoConv" v-model="tipoConv">Seção</label>
                <label class="radio-inline"><input type="radio" name="optTipoConv" v-model="tipoConv">Patrulha</label>
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
</style>


