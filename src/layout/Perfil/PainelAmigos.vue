<script>
import {mapGetters} from 'vuex'
import ItemAmigo from './PainelAmigos/ItemAmigo.vue'
var vm = {
    components: {
        ItemAmigo
    },
    data(){
        return {
            exibir: 'amigos'
       }
    },
    firebase(){
        return {
            amigos: {
                source: this.database.ref('/usuario/'+this.usuarioDaPag['.key']+'/amigos'),
                asObject: false
            },
            conversas:  this.database.ref("conversas")
        }
    },
    watch: {
      'usuarioDaPag'(){
        this.$unbind('amigos')
        this.$bindAsArray('amigos', this.database.ref('/usuario/'+this.usuarioDaPag['.key']+'/amigos'))
      }
    },
    props: ['usuarioDaPag', 'ehDessePerfil'],
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        numSolicitacoes(){
            var solicitacoes = this.usuarioDaPag.solicitacoesDeAmizade
            return solicitacoes
                ? Object.keys(solicitacoes).map(k => solicitacoes[k]).length
                : 0
        },
        numAmigos(){
            var count = 0
            if(this.amigos){
                this.amigos.forEach(amigo=>{
                    if(amigo.chave){
                        count++
                    }
                })
            }
            return count
        }
    },
    methods: {
        confirmarSolicitacao(solicitacao){
            var conversaRef = this.$firebaseRefs.conversas.push()
             var chaveConversa = conversaRef.key
            this.database.ref('/usuario/'+this.usuarioDatabase['.key']+'/amigos').push({
                nome: solicitacao.de.nome,
                chave: solicitacao.de.chave,
                countMensagensNaoLidas: 0  
            }).then(resultado => {
                this.database.ref("usuario/"+this.usuarioDatabase['.key']+"/conversas").push(
                    {"chave": chaveConversa, "outroUser": solicitacao.de.chave})
            }).then(resultado => {
                this.database.ref('/usuario/'+solicitacao.de.chave+'/amigos').push({
                    nome: this.usuarioDatabase.nome,
                    chave: this.usuarioDatabase['.key'],
                    countMensagensNaoLidas: 0  
                }).then(resultado =>{
                    this.database.ref("usuario/"+solicitacao.de.chave+"/conversas").push(
                        {"chave": chaveConversa, "outroUser": this.usuarioDatabase['.key']})
                })
                }).then(resultado => this.excluirSolicitacao(solicitacao))
        },
        excluirSolicitacao(solicitacao){
            var ref = this.database.ref('/usuario/'+this.usuarioDatabase['.key']+'/solicitacoesDeAmizade/')
            ref
            .orderByChild('de/chave').equalTo(solicitacao.de.chave).once('value', snapshot => {
                    let updates = {};
                    snapshot.forEach(child => updates[child.key] = null);
                    ref.update(updates)
            }).catch(erro => {
                    bootbox.alert('Erro! Não foi possível remover a solicitação')
                    console.log(erro)
                })
        }
    }
}
export default vm
</script>
<template>
    <div class="panel panel-warning painel-amigos col-xs-12 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-users" aria-hidden="true"></i> Amigos
        </div>
        <div class="panel-body">
            <ul v-if="exibir == 'amigos'" class="list-group list-inline text-center list-amigos">
                <item-amigo v-for="amigo in amigos" :key="amigo.chave" :amigo="amigo" v-if="amigo.chave"></item-amigo>
            </ul>
            <ul v-else-if="exibir == 'solicitacoes'" class="list-group list-amigos">
                <li v-for="solicitacao in usuarioDatabase.solicitacoesDeAmizade" class="list-group-item list-group-item-warning">
                    <i aria-hidden="true" class="fa fa-user-circle"></i>
                    <span>{{solicitacao.de.nome}}</span>
                    <div class="btn-toolbar pull-right check-x">
                        <button @click="excluirSolicitacao(solicitacao)" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                        <button @click="confirmarSolicitacao(solicitacao)" class="btn btn-success">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-footer">
            <div class="btn-toolbar">
                <button @click="exibir = 'amigos'" class="btn btn-warning form-control btnAmigos">
                    <span class="badge">{{numAmigos}}</span> Amigos
                </button>
                <button @click="exibir = 'solicitacoes'" v-if="ehDessePerfil" class="btn btn-primary form-control">
                    <span class="badge">{{numSolicitacoes}}</span> Solicitações
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .check-x > .btn{
        font-size: 12px;
    }
    .btnAmigos{
      margin-bottom: 1px;
    }
</style>

<style>
    .list-amigos::-webkit-scrollbar {
        width: 11px;
        height: 11px;
    }
    .list-amigos::-webkit-scrollbar-button {
        width: 1px;
        height: 1px;
    }
    .list-amigos::-webkit-scrollbar-thumb {
        background: #f4e7cc;
        border: 22px none #ffffff;
        border-radius: 50px;
    }
    .list-amigos::-webkit-scrollbar-thumb:hover {
        background: #eacf9b;
    }
    .list-amigos::-webkit-scrollbar-thumb:active {
        background: #dfb566;
    }
    .list-amigos::-webkit-scrollbar-corner {
        background: transparent;
    }

    .list-amigos{
        overflow: scroll;
        max-height: 370px;
    }
    .list-amigos > li{
       margin:10px;
    }
</style>
