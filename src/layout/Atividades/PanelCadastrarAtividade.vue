<script>
/* COMPONENTES */
import CheckMateriais from './CheckMateriais.vue'
import PanelConvidados from './PanelCadastrarAtividades/PanelConvidados.vue'

/* FERRAMENTAS */
import Validador from './PanelCadastrarAtividades/Validador'

/* CONSTANTES */
import tiposAtividadeImport from '../../constantes/Atividades/tiposAtividade'
import materiaisImport from '../../constantes/Atividades/materiais'

/* VUEX */
import {mapGetters} from 'vuex'

export default {
    components: {
        PanelConvidados,
        CheckMateriais
    },
    data(){
        return {
            tiposAtividade: tiposAtividadeImport,
            materiais: materiaisImport,
            materiaisSelecionados: [],
            materiaisAdicionados: [],
            txtNovoMaterial: '',
            dataInicio: new Date(),
            mapa: '',
            lugar: '',
            tipoDaAtividade: '',
            tipoEspecificadoAtividade: '',
            txtTitulo: '',
            dateTimeInicial: '',
            dateTimeFinal: '',
            participantes: ''
        }
    },
    methods: {
        setPlace(lugar){
            this.lugar = lugar
        },
        adicionarMaterial(){
            if(this.txtNovoMaterial){
                this.materiaisAdicionados.push(this.txtNovoMaterial)
                this.txtNovoMaterial = ''
            }
        },
        removerMaterial(index){
            this.materiaisAdicionados.splice(index, 1)
        },
        cancelar(){
            this.$emit('cancelarCadastroDeAtividade')
        },
        cadastrarAtividade(){
            //Definição dos atributos da atividade
            let titulo, tipo, materiais, inicio, termino, local, participantes

            //Valorização dos atributos da atividade
            titulo = this.txtTitulo
            tipo = this.tipoDaAtividade == 'Outro' ? this.tipoEspecificadoAtividade : this.tipoDaAtividade
            materiais = this.materiaisSelecionados.concat(this.materiaisAdicionados)
            inicio = new Date(this.dateTimeInicial).getTime()
            termino = new Date(this.dateTimeFinal).getTime()
            local = this.centro
            participantes = this.participantes

            //Aglomerando atividade
            let novaAtividade = {
                titulo, tipo, materiais, inicio, termino, local, participantes
            }

            //Validando
            if(!Validador.validar(novaAtividade)){
                console.log('não vingou...')
                return
            }
            console.log(novaAtividade)
            //Cadastrando no firebase
            this.database.ref('/atividade/').push(novaAtividade).then(snap => {
                //Adicionando o mapAtividadeParteHierarquica para cada participante
                // OBSERVAÇÃO IMPORTANTE: ISSO TEM QUE IR PRO BACKEND DEPOIS
                novaAtividade.participantes.forEach(participante =>
                    this.database.ref('/mapAtividadePH/').push({
                        chaveAtividade: snap.key,
                        chavePH: participante.chave
                    })
                )

            })
            this.cancelar()
            
        },
        atualizarParticipantes(part){
            this.participantes = part
        },
        atualizarMateriaisSelecionados(novosMateriais){
            this.materiaisSelecionados = novosMateriais
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'}),
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
                <button @click="cancelar()" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4>
                    <i aria-hidden="true" class="fa fa-free-code-camp"></i>
                    Cadastre uma Atividade
                </h4>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="form-group">
                        <label for="txtTituloAtividade">Título:</label>
                        <input v-model="txtTitulo" class="form-control" placeholder="Ex: Atividade no Jardim Botânico" type="text" id="txtTituloAtividade">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="selectTipoAtividade">Tipo:</label>
                        <select v-model="tipoDaAtividade" class="form-control" id="selectTipoAtividade">
                            <option disabled>Selecione um tipo de Atividade</option>
                            <template v-for="tipoAtividade in tiposAtividade">
                                <option :value="tipoAtividade">{{tipoAtividade}}</option>
                            </template>
                        </select>
                    </div>
                    <div v-if="tipoDaAtividade == 'Outro'" class="form-group">
                        <input v-model="tipoEspecificadoAtividade" class="form-control" type="text" placeholder="Qual o tipo da atividade?">
                    </div>
                </div>
                <div class="row">
                    <check-materiais @atualizarMateriaisSelecionados="atualizarMateriaisSelecionados"></check-materiais>
                </div>
                <template v-if="materiaisSelecionados.indexOf('Outros') != -1">
                    <div class="row">
                        <label>Adicione Materiais: </label>
                    </div>
                    <div class="row">
                            <div class="col-xs-6">
                                <div class="input-group">
                                    <input @keyup.enter="adicionarMaterial()" v-model="txtNovoMaterial" class="form-control" type="text" placeholder="Digite o nome do material...">
                                    <span class="input-group-btn">
                                        <button @click="adicionarMaterial()" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="list-group list-inline">
                                    <template v-for="(material, index) in materiaisAdicionados">
                                        <li @click="removerMaterial(index)" class="list-group-item">
                                            {{material}}
                                        </li>
                                        <template v-if="index < materiaisAdicionados.length - 1">
                                            <span>, </span>
                                        </template>
                                    </template>
                                </div>
                            </div>
                    </div>

                </template>
                <div class="row">
                    <div class="form-group">
                        <label for="datetimeInicio">Data e hora de início:</label>
                        <input v-model="dateTimeInicial" id="datetimeInicio" class="form-control" type="datetime-local">
                    </div>
                    <div class="form-group">
                        <label for="datetimeTermino">Data e hora do término:</label>
                        <input v-model="dateTimeFinal" id="datetimeTermino" class="form-control" type="datetime-local">
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
                        <panel-convidados @atualizarParticipantes="atualizarParticipantes"></panel-convidados>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="btn-toolbar pull-right" role="toolbar">
                        <button @click="cancelar()" type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
                        <button @click="cadastrarAtividade()" class="btn btn-success">Cadastrar</button>
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
.list-inline > li{
    min-width: 50px;
    text-align: center;
    margin-bottom:5px;
    cursor: pointer;
}
.list-inline > li:hover{
    background-color: rgba(155,0,0,.1)
}
.list-inline{
    overflow: scroll;
}
</style>

<style>
#gmap-atv{
    z-index: 1051!important;
}
</style>
