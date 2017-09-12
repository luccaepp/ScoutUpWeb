<script>
import 'vue-event-calendar/dist/style.css'
import {mapGetters} from 'vuex'
import formatadorDeTimeStamp from '../funcoesGlobais/timeStamp/timeStamp.js'
import PanelCadastrarAtividade from '../layout/Atividades/PanelCadastrarAtividade.vue'

export default {
    components: {
        'cadastrar-atividades': PanelCadastrarAtividade
    },
    firebase(){
        return {
        }
    },
    data () {
        return {
            atividades: [],
            //Atividades processadas = eventos
            eventos: [],
            cadastrando: false,
            atividadesCarregadas: false,
            mapAtividadesGrupo: null,
            mapAtividadesSecao: null
        }
    },
    methods: {
        usaBR(usa){
            return formatadorDeTimeStamp.strUSAParaBR(usa)
        },
        fazerBinds(){
            if(this.usuarioDatabase){
                console.log('entrou', this.usuarioDatabase.grupo)
                //Retornando os maps com as keys das atividades do grupo
                this.$bindAsArray('mapAtividadesGrupo', this.database.ref('/mapAtividadePH/').orderByChild('chavePH').equalTo(this.usuarioDatabase.grupo))
                this.$bindAsArray('mapAtividadesSecao', this.database.ref('/mapAtividadePH/').orderByChild('chavePH').equalTo(this.usuarioDatabase.secao.chave))
            }
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'})
    },
    watch: {
        atividades(){
            console.log('atividades: ', this.atividades)
                this.atividades.forEach(atividade => {
                    let data = formatadorDeTimeStamp.retornaTimeStampSoDateUSA(atividade.inicio)
                    console.log('atividade: ', atividade)
                    this.eventos.push({
                        date: data,
                        title: atividade.titulo,
                        desc: atividade.tipo,
                        atividade: atividade
                    })
                })
        },
        usuarioDatabase(){
            this.fazerBinds()
        },
        mapAtividadesGrupo(){
            console.log('mapAtividadesGrupo', this.mapAtividadesGrupo)
            if(this.mapAtividadesGrupo){
                let vm = this, i = 0
                if(this.mapAtividadesGrupo.length != 0)
                    this.atividadesCarregadas = false
                this.atividades = []
                this.mapAtividadesGrupo.forEach(map => {
                    i++
                    this.database.ref('atividade').child(map.chaveAtividade).on('value', snap => {
                        this.atividades.push(snap.val())
                    })
                    if(vm.mapAtividadesGrupo.length == i) vm.atividadesCarregadas = true
                })
            }
        },
        mapAtividadesSecao(){
            if(this.mapAtividadesSecao){
                let vm = this, i = 0
                if(this.mapAtividadesSecao.length != 0)
                    this.atividadesCarregadas = false
                this.atividades = []
                this.mapAtividadesSecao.forEach(map => {
                    i++
                    vm.database.ref('atividade').child(map.chaveAtividade).on('value', snap => {
                        vm.atividades.push(snap.val())
                    })
                    if(mapAtividadesSecao.length == i) vm.atividadesCarregadas = true
                })
            }
        }
    },
    created(){
        this.fazerBinds()
    }
}
</script>

<template>
    <div v-if="usuarioDatabase && !usuarioDatabase.grupo" class="container-fluid">
        <div class="row">
            <h1>Você precisa de um grupo para ter acesse às Atividades.</h1>
        </div>
    </div>
    <div v-else class="container-fluid">
        <div class="row">
            <vue-event-calendar v-if="!cadastrando" :events="eventos">
                <template scope="props">
                    <!-- RAIZ -->
                    <div>
                        <div v-for="(event, index) in props.showEvents" class="event-item">
                            <div class="panel">
                                <div class="panel-heading">
                                <i aria-hidden="true" class="fa fa-free-code-camp ifaccamp text-danger"></i>
                                <span class="titEvento">{{event.title}} - <span class="text-success">{{event.atividade.tipo}}</span></span>
                                <span class="pull-right">{{usaBR(event.date)}}</span>
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
                                                    {{new Date(event.atividade.inicio).toLocaleDateString()}}
                                                    {{new Date(event.atividade.inicio).toLocaleTimeString().substring(0, 5)}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Término</td>
                                                <td>
                                                    {{new Date(event.atividade.termino).toLocaleDateString()}}
                                                    {{new Date(event.atividade.termino).toLocaleTimeString().substring(0, 5)}}
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
                                                        {{part.nome}}
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
                            </div>
                        </div>
                        <div v-if="usuarioDatabase && usuarioDatabase.tipo == 'escotista'" class="row">
                            <div class="btn-toolbar btn-toolbar-down col-xs-11">
                                <button class="btn btn-success btn-lg btn-circle pull-right" @click="cadastrando = true">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div> 
                    </div>
                </template>
            </vue-event-calendar>
        </div>
        <div class="row">
            <cadastrar-atividades @cancelarCadastroDeAtividade="cadastrando = false" v-if="cadastrando"></cadastrar-atividades>
        </div>
    </div>

</template>
<style scoped>
.table > thead > tr > th, .table > tbody > tr > td{
    text-align: center;
}
</style>

<style>
body{
    background-image: url(../assets/paisagem-background.png);
}
.ifaccamp{
    color: #56402E;
}
span.titEvento{
    font-family: claire;
    font-size: 20px;
}
.btn-toolbar-down{
    position: absolute;
    bottom: 20px;
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
</style>

