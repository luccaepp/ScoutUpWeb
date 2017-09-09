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
            cadastrando: false
        }
    },
    methods: {
        usaBR(usa){
            return formatadorDeTimeStamp.strUSAParaBR(usa)
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
            if(this.usuarioDatabase){
                console.log('entrou', this.usuarioDatabase.grupo)
                this.$bindAsArray('atividades', this.database.ref('/atividade/').orderByChild('chave').equalTo(this.usuarioDatabase.grupo))
            }
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <vue-event-calendar v-if="!cadastrando" :events="eventos">
                <template scope="props">
                    <!-- RAIZ -->
                    <div>
                        <div v-for="(event, index) in props.showEvents" class="event-item">
                            <div class="panel">
                                <div class="panel-heading">
                                <i aria-hidden="true" class="fa fa-free-code-camp ifaccamp"></i>
                                <span class="titEvento">{{event.title}}</span>
                                <span class="pull-right">{{usaBR(event.date)}}</span>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th colspan="2">Informações{{event.atividade}}   </th>                                                                                        
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
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

