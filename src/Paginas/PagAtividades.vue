<script>
import 'vue-event-calendar/dist/style.css'
import {mapGetters} from 'vuex'
import formatadorDeTimeStamp from '../funcoesGlobais/timeStamp/timeStamp.js'
import ModalCadastrarAtividade from '../layout/Atividades/ModalCadastrarAtividade.vue'

export default {
    components: {
        ModalCadastrarAtividade
    },
    firebase(){
        return {
        }
    },
    data () {
        return {
            atividades: [],
            //Atividades processadas = eventos
            eventos: []
        }
    },
    methods: {
        usaBR(usa){
            return formatadorDeTimeStamp.strUSAParaBR(usa)
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'})
    },
    watch: {
        atividades(){
            console.log('atividades: ', this.atividades)
                this.atividades.forEach(atividade => {
                    let data = formatadorDeTimeStamp.retornaTimeStampSoDateUSA(atividade.timeStamp * 1000)
                    console.log('atividade: ', data)
                    this.eventos.push({
                        date: data,
                        title: atividade.nome,
                        desc: atividade.tipo
                    })
                })
        }
    },
    created(){
        this.$bindAsArray('atividades', this.database.ref('/atividade'))
    }  
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <vue-event-calendar :events="eventos">
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
                            </div>
                        </div>
                        <div class="row">
                            <div class="btn-toolbar btn-toolbar-down col-xs-11">
                                <button class="btn btn-success btn-lg btn-circle pull-right" data-toggle="modal" data-target="#modalCadastrarAtividade">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div> 
                    </div>
                </template>
            </vue-event-calendar>
        </div>
        <div class="row">
            <modal-cadastrar-atividade></modal-cadastrar-atividade>
        </div>
    </div>

</template>

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

