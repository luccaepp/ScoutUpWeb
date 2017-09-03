<script>
import PanelConvidados from './PanelCadastrarAtividades/PanelConvidados.vue'
export default {
    components: {
        PanelConvidados
    },
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
                          ],
            materiais: [
                'Barraca',
                'Cordas',
                'Lona',
                'Material de Sapa',
                'Material de Lenha',
                'Material Cartográfico',
                'Outros'
            ],
            materiaisSelecionados: [],
            dataInicio: new Date(),
            mapa: '',
            lugar: ''
        }
    },
    methods: {
        setPlace(lugar){
            this.lugar = lugar
        }
    },
    computed: {
        centro(){
            //Caso não haja um lugar setado
            if(!this.lugar){
                return {
                    lat: 10,
                    lng: 10
                }
            }

            return {
                lat: this.lugar.geometry.location.lat(),
                lng: this.lugar.geometry.location.lng()
            }
        }
    }
}
</script>
<template>
    <div class="container">    
        <div class="panel panel-default">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4>
                    <i aria-hidden="true" class="fa fa-free-code-camp"></i>
                    Cadastre uma Atividade
                </h4>
            </div>
            <div class="panel-body">
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
                        <label>Materiais Necessários:</label>
                        <template v-for="material in materiais">
                            <label class="checkbox-inline">
                                <input type="checkbox" :value="material" v-model="materiaisSelecionados">
                                {{material}}
                            </label>
                            
                        </template>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="datetimeInicio">Data e hora de início:</label>
                        <input id="datetimeInicio" class="form-control" type="datetime-local">
                    </div>
                    <div class="form-group">
                        <label for="datetimeTermino">Data e hora do término:</label>
                        <input id="datetimeTermino" class="form-control" type="datetime-local">
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        <label>Local:</label>
                        <gmap-map
                            :center="centro"
                            :zoom="14"
                            map-type-id="hybrid"
                            style="width: 500px; height: 300px"
                            >
                                <gmap-marker v-if="lugar"
                                            :position="{
                                                lat: lugar.geometry.location.lat(),
                                                lng: lugar.geometry.location.lng()
                                                }">

                                </gmap-marker>
                            </gmap-map>
                            <gmap-autocomplete class="form-control" @place_changed="setPlace" id="gmap-atv"></gmap-autocomplete>
                    </div>
                    <div class="col-xs-6">
                        <panel-convidados></panel-convidados>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="btn-toolbar pull-right" role="toolbar">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-success">Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-body{
    padding: 30px;
}
.btn-toolbar{
    padding-right: 10px;
}
</style>

<style>
#gmap-atv{
    z-index: 1051!important;
}
</style>
