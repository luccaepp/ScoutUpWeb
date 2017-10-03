<script>
import formatadorDeTimeStamp from '../../../funcoesGlobais/timeStamp/timeStamp'
import PanelConvidados from '../PanelCadastrarAtividades/PanelConvidados.vue'
import TiposAtividade from '../../../constantes/Atividades/tiposAtividade'
import ModalMateriais from './PanelAtividade/ModalMateriais.vue'

export default {
  props: ['event'],
  components: {
      PanelConvidados,
      ModalMateriais
  },
  data(){
      return {
          editando: false,
          datetimeInicial: null,
          datetimeFinal: null,
          txtTitulo: '',
          lugar: '',
          localEvent: '',
          participantesEdit: null,
          participantesEvent: null,
          TiposAtividade,
          tipoDaAtividadeEdit: null,
          materiaisEdit: null
      }
  },
  methods: {
    usaBR(usa){
        return formatadorDeTimeStamp.strUSAParaBR(usa)
    },
    /* Define o "to" do router-link */
    to(part){
        return part.tipo == 'grupo' 
                ? '/grupos/' + part.chave
                : part.tipo == 'secao'
                    ? '/grupos/'+part.chaveGrupo+'/secoes/'+part.chave
                    : null
    },
    remover(){
        this.$emit('remover', this.event.atividade)
    },
    setPlace(lugarSelecionado){
        this.lugar = {
            lat: lugarSelecionado.geometry.location.lat(),
            lng: lugarSelecionado.geometry.location.lng()
        }
    },
    atualizarParticipantes(part){
        this.participantesEvent = part
    }
  },
  watch: {
    participantesEvent(){
        if(this.participantesEvent)
            this.participantesEdit = this.participantesEvent
    },
    localEvent(){
        if(this.localEvent){
            this.lugar = this.localEvent
        }
    }
  },
  created(){
      /* Valores padrão dos inputs de atualização */
      this.participantesEvent = this.event.atividade.participantes
      this.localEvent = this.event.atividade.local
      this.datetimeInicial = this.event.atividade.inicio
      this.datetimeFinal = this.event.atividade.termino
      this.tipoDaAtividadeEdit = this.event.atividade.tipo
      this.txtTitulo = this.event.atividade.titulo
      this.materiaisEdit = this.event.atividade.materiais
  }
}
</script>

<template>
<div class="panel">
    <div class="panel-heading">
        <!-- Inputs que permitem alterar a Atividade -->
        <template v-if="editando">
            <input v-model="txtTitulo" class="form-control" placeholder="Digite o nome da atividade" type="text" id="txtTituloAtividade">
            <select v-model="tipoDaAtividadeEdit" class="form-control select-tipos-atividade">
                <option disabled>Selecione um tipo de Atividade</option>
                <template v-for="tipoAtividade in TiposAtividade">
                    <option :value="tipoAtividade">{{tipoAtividade}}</option>
                </template>
            </select>
        </template>
        <!-- Apenas Mostrando Informações -->
        <template v-else>
            <i aria-hidden="true" class="fa fa-free-code-camp ifaccamp text-danger"></i>
            <span class="titEvento">{{event.title}} - <span class="text-success">{{event.atividade.tipo}}</span></span>
            <span class="pull-right">{{usaBR(event.date)}}</span>
        </template>
    </div>
    <div class="panel-body">
        <!-- Tabela de informações específicas -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th colspan="2">Informações</th>                                                                                        
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Início</td>
                    <td>
                        <template v-if="editando">
                            <input v-model="datetimeInicial" class="form-control" type="datetime-local">
                        </template>
                        <template v-else>
                            {{new Date(event.atividade.inicio).toLocaleDateString()}}
                            {{new Date(event.atividade.inicio).toLocaleTimeString().substring(0, 5)}}
                        </template>
                    </td>
                </tr>
                <tr>
                    <td>Término</td>
                    <td>
                        <template v-if="editando">
                            <input v-model="datetimeFinal" class="form-control" type="datetime-local">
                        </template>
                        <template v-else>
                            {{new Date(event.atividade.termino).toLocaleDateString()}}
                            {{new Date(event.atividade.termino).toLocaleTimeString().substring(0, 5)}}
                        </template>
                    </td>
                </tr>
                <tr>
                    <td>Local</td>
                    <td>
                        <gmap-map
                            :center="event.atividade.local"
                            :zoom="14"
                            map-type-id="hybrid"
                            style="width: 290px; height: 260px"
                            v-if="!editando"
                            >
                                <gmap-marker v-if="event.atividade.local && !editando"
                                            :position="event.atividade.local">

                                </gmap-marker>
                        </gmap-map>
                        <template v-else>
                            <gmap-map
                                :center="lugar"
                                :zoom="14"
                                map-type-id="hybrid"
                                style="width: 290px; height: 260px"
                                >
                                <gmap-marker :position="lugar">
                                </gmap-marker>
                            </gmap-map>
                            <gmap-autocomplete v-if="editando" class="form-control" @place_changed="setPlace"></gmap-autocomplete>
                        </template>

                    </td>
                </tr>
                <tr>
                    <td>Participantes</td>
                    <td v-if="editando">
                        <panel-convidados @atualizarParticipantes="atualizarParticipantes" :convidados-props="participantesEdit"></panel-convidados>
                    </td>
                    <td v-else>
                        <li v-for="part in event.atividade.participantes" class="list-group-item list-group-item-info">
                            <router-link :to="to(part)">{{part.nome}}</router-link>
                        </li>
                    </td>
                </tr>
                <tr>
                    <td>Materiais Necessários</td>
                    <td>
                        <template v-if="editando">
                            <li v-for="material in materiaisEdit" class="list-group-item">
                                {{material}}
                            </li>
                            <button v-if="editando" class="btn btn-warning pull-right" data-toggle="modal" data-target="#modalAlterarMateriaisAtividade">
                                Editar
                            </button>
                        </template>
                        <template v-else>
                            <li v-for="material in event.atividade.materiais" class="list-group-item">
                                {{material}}
                            </li>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="panel-footer">
        <div class="btn-toolbar" role="toolbar">
            <div class="pull-right">
                <template v-if="!editando">
                    <button @click="remover()" class="btn btn-danger btn-space">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button @click="editando = true" class="btn btn-default">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </template>
                <template v-else>
                    <button @click="editando = false" class="btn btn-danger btn-space">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-success">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                </template>
            </div>
        </div>
    </div>
    <modal-materiais :materiais="materiaisEdit"></modal-materiais>
</div>
</template>

<style scoped>
.select-tipos-atividade{
    margin-top: 5px;
}
</style>


<style>
.btn-space {
    margin-right: 5px;
}
</style>


