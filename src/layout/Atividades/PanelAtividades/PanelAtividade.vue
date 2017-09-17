<script>
import formatadorDeTimeStamp from '../../../funcoesGlobais/timeStamp/timeStamp'
export default {
  props: ['event'],
  data(){
      return {
          editando: false,
          datetimeInicial: null,
          datetimeFinal: null,
          txtTitulo: ''
      }
  },
  methods: {
    usaBR(usa){
        return formatadorDeTimeStamp.strUSAParaBR(usa)
    },
    to(part){
        return part.tipo == 'grupo' 
                ? '/grupos/' + part.chave
                : part.tipo == 'secao'
                    ? '/grupos/'+part.chaveGrupo+'/secoes/'+part.chave
                    : null
    },
    remover(){
        this.$emit('remover', this.event.atividade)
    }
  }
}
</script>

<template>
    <div class="panel">
        <div class="panel-heading">
        <template v-if="editando">
            <input v-model="txtTitulo" class="form-control" placeholder="Digite o nome da atividade" type="text" id="txtTituloAtividade">
        </template>
        <template v-else>
            <i aria-hidden="true" class="fa fa-free-code-camp ifaccamp text-danger"></i>
            <span class="titEvento">{{event.title}} - <span class="text-success">{{event.atividade.tipo}}</span></span>
            <span class="pull-right">{{usaBR(event.date)}}</span>
        </template>

        </div>
    <div class="panel-body">
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
                            >
                                <gmap-marker v-if="event.atividade.local"
                                            :position="event.atividade.local">

                                </gmap-marker>
                        </gmap-map>
                    </td>
                </tr>
                <tr>
                    <td>Participantes</td>
                    <td>
                        <li v-for="part in event.atividade.participantes" class="list-group-item list-group-item-info">
                            <router-link :to="to(part)">{{part.nome}}</router-link>
                        </li>
                    </td>
                </tr>
                <tr>
                    <td>Materiais Necessários</td>
                    <td>
                        <li v-for="material in event.atividade.materiais" class="list-group-item">{{material}}</li>
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
    </div>
</template>
<style>
.btn-space {
    margin-right: 5px;
}
</style>


