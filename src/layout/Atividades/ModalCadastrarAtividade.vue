<script>
export default {
    data(){
        return {
            tiposAtividade: ['Atividade normal (sede)',
                            'Bivaque',
                            'Bivaque noturno',
                            'Acampamento',
                            'Acantonamento',
                            'Jornada',
                            'Atividade Náutica',
                            'Atividade Aérea',
                            'Visita a outro Grupo',
                            'Atividades Especiais',
                            'Outro'
                            ]
        }
    }
}
</script>
<template>
    <!-- Modal -->
    <div id="modalCadastrarAtividade" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <i aria-hidden="true" class="fa fa-free-code-camp"></i> 
                        Cadastre uma Atividade
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                            <label for="txtTituloAtividade">Título:</label>
                            <input class="form-control" placeholder="Ex: Atividade no Jardim Botânico" type="text" id="txtTituloAtividade">
                        </div>                  
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="selectTipoAtividade">Tipo:</label>
                            <select class="form-control" id="selectTipoAtividade">
                                <option disabled>Selecione um tipo de Atividade</option>
                                <template v-for="tipoAtividade in tiposAtividade">
                                    <option :value="tipoAtividade">{{tipoAtividade}}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.modal-body{
    padding: 30px;
}
</style>