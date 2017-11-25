<script>
import {mapGetters} from 'vuex'
import PanelAtividade from './PanelAtividades/PanelAtividade.vue'
import formatadorDeTimeStamp from '../../funcoesGlobais/timeStamp/timeStamp'
export default {
    props: ['cadastrando'],
    data(){
      return {
        atividadesCarregadas: false,
        atividades: [],
        //Atividades processadas = eventos
        eventos: [],
        mapAtividadesGrupo: null,
        mapAtividadesSecao: null
      }
    },
    components: {
        PanelAtividade
    },
    methods: {
        fazerBinds(){
            if(this.usuarioDatabase){
                this.atividades = []
                //Retornando os maps com as keys das atividades do grupo
                this.$bindAsArray('mapAtividadesGrupo', this.database.ref('/mapAtividadePH/').orderByChild('chavePH').equalTo(this.usuarioDatabase.grupo))
                this.$bindAsArray('mapAtividadesSecao', this.database.ref('/mapAtividadePH/').orderByChild('chavePH').equalTo(this.usuarioDatabase.secao.chave))
            }
        },
        remover(atividade){
            let self = this
            bootbox.confirm('Você tem certeza que quer remover a atividade?', querRemover => {
                if(querRemover){
                    self.database.ref('/atividade/'+atividade.chave).remove()
                }
            })
        },
        refresh(map){
            if(map){
                let vm = this, i = 0
                if(map.length != 0)
                    this.atividadesCarregadas = false
                map.forEach(subMap => {
                    i++
                    this.database.ref('atividade').child(subMap.chaveAtividade).on('value', snap => {
                        let atividadeEmSi = snap.val()
                        //removendo atividade excluída
                        if(!atividadeEmSi){
                            vm.atividades.splice(vm.atividades.indexOf(atividadeEmSi), 1)
                            return
                        } 
                        atividadeEmSi.chave = snap.key
                        //Caso essa atividade já tenha sido inserida
                        if(vm.atividades.filter(ativ => ativ.chave == snap.key).length != 0) return

                        vm.atividades.push(atividadeEmSi)
                    })
                    if(map.length == i) vm.atividadesCarregadas = true
                })
            }
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'})
    },
    watch: {
        usuarioDatabase(){
            this.fazerBinds()
        },
        mapAtividadesGrupo(){
            this.refresh(this.mapAtividadesGrupo)
        },
        mapAtividadesSecao(){
            this.refresh(this.mapAtividadesSecao)
        },
        atividades(){
                console.log('atividades', this.atividades)
                this.eventos = []
                this.atividades.forEach(atividade => {
                    let data = formatadorDeTimeStamp.retornaTimeStampSoDateUSA(atividade.inicio)
                    this.eventos.push({
                        date: data,
                        title: atividade.titulo,
                        desc: atividade.tipo,
                        atividade: atividade
                    })
                })
        }
    },
    created(){
        let self = this
        this.fazerBinds()
    }
}
</script>
<template>
    <div class="container panel-atividades">
            <vue-event-calendar class="calendar" :events="eventos">
                <template scope="props">
                    <!-- RAIZ -->
                    <div class="row">
                        <div v-for="(event, index) in props.showEvents" class="event-item">
                            <panel-atividade @remover="remover" :event="event"></panel-atividade>
                        </div>
                    </div>
                </template>
            </vue-event-calendar>
        <div v-if="usuarioDatabase && usuarioDatabase.tipo == 'escotista'" class="row">
            <div class="btn-toolbar col-xs-12">
                <div class="pull-right">
                    <button class="btn btn-success btn-lg btn-circle btn-mais" @click="$emit('iniciarCadastroDeAtividade')">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>
<style>
.btn-mais{
    margin-top:-70px;
    margin-right: 55px;
    opacity: .9;
}
.btn-mais:hover{
    opacity: 1;
}
@media(max-width: 768px) {
  .panel-atividades{
    margin-top: 100px;
  }
}

/* .calendar{
    background-color: rgba(86, 64, 46, 0.8);
    border-radius: 10px;
}
.item{
    color: white !important;
}
span.is-today{
    background-color: white !important ;
}
.is-event{
    background-color: rgba(86, 64, 46, 0.8) !important;
} */

</style>

<style scoped>
.table > thead > tr > th, .table > tbody > tr > td{
    text-align: center;
}
</style>
