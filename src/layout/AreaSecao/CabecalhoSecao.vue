<script>
import { mapGetters } from 'vuex'
var vm = {
    props: ['grupo', 'secao'],
    data(){
        return {
            enviandoSolicitacao: false,
            excluindoSolicitacao: false
        }
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', firebase: 'getFirebase'}),
        ehDoGrupo(){
            if(this.usuarioDatabase.grupo == this.grupo['.key']) return true
            return false
        },
        ehDaSecao(){
            if(!this.usuarioDatabase || !this.usuarioDatabase.secao) return false
            if(this.usuarioDatabase.secao.chave == this.secao['.key']) return true
            return false
        },
        solicitacaoEnviada(){
            return this.usuarioDatabase.solicitacaoDeEntradaEmSecao
        },
        refSolicitacoes(){
            return this.database.ref('grupo').child(this.grupo['.key'])
                                             .child('secoes')
                                             .child(this.secao['.key'])
                                             .child('solicitacoes')
        },
        temSecao(){
            if(this.usuarioDatabase.secao) return true
            return false
        }
    },
    methods: {
        enviarSolicitacaoDeEntrada(){
            let self = this
            this.enviandoSolicitacao = true
            this.refSolicitacoes.push({
                usuario: {
                    nome: this.usuarioDatabase.nome,
                    chave: this.usuarioDatabase['.key']
                },
                timeStamp: this.firebase.database.ServerValue.TIMESTAMP
            }).then(resultado => {
                console.log('Solicitação Enviada', resultado)
                self.database.ref('/usuario/'+this.usuarioDatabase['.key']).update({
                    solicitacaoDeEntradaEmSecao: {
                        nome: self.secao.nome,
                        chaveSecao: self.secao['.key'],
                        chaveGrupo: self.grupo['.key'],
                        nomeGrupo: self.grupo.nome,
                        chaveSolicitacao: resultado.key
                    }
                }).then(resultado2 => self.enviandoSolicitacao = false)
            }).catch(err => self.enviandoSolicitacao = false)
        },
        cancelarSolicitacao(){
            this.excluindoSolicitacao = true
            let self = this
            console.log()
            this.refSolicitacoes.orderByChild('usuario/chave')
                                .equalTo(self.usuarioDatabase['.key'])
                                .once('value', snap => {snap.ref.remove();console.log('snap', snap.val())})
                                .then(resultado => {
                                    self.database.ref('usuario')
                                                 .child(self.usuarioDatabase['.key'])
                                                 .child('solicitacaoDeEntradaEmSecao')
                                                 .remove()
                                })
                                .then(snap2 => self.excluindoSolicitacao = false)
                                .catch(snapC => self.excluindoSolicitacao = false)
        }
    }
}
export default vm
</script>
<template>
    <div>
        <span class="nav-esc col-lg-4 col-xs-12 pull-left">
            <router-link :to="'/grupos/'+grupo['.key']">
                <i class="fa fa-building" aria-hidden="true"></i> <span>{{grupo.nome}}</span>
            </router-link> 
            <span>/</span> 
            <router-link :to="$route.path">
                <i aria-hidden="true" class="fa fa-object-group"></i> <span>{{secao.nome}}</span>
            </router-link>
        </span>
        <p class="text-center titulo col-xs-12"><i aria-hidden="true" class="fa fa-object-group text-verdinho"></i>
             <br> 
             <span>{{secao.nome}}</span>
        </p>
        <p>
            <template v-if="ehDoGrupo && !ehDaSecao && !enviandoSolicitacao && !temSecao">
                <button @click="enviarSolicitacaoDeEntrada()" v-if="!solicitacaoEnviada" class="btn btn-info">
                    Enviar Solicitação de Entrada
                </button>
                <button @click="cancelarSolicitacao()" v-else-if="!excluindoSolicitacao" class="btn btn-danger">
                    <i class="fa fa-times" aria-hidden=""></i>
                    Cancelar Solicitação
                </button>
            </template>

        </p>
    </div>


</template>

<style>
.nav-esc > a{
    color:#eacf9b!important;
    text-decoration: underline;
    font-size: 18px;
}
.titulo{
    font-family: claire;
    font-size: 70px;
}
.text-verdinho, .text-verdinho:active, .text-verdinho:hover{
    color:#B9C159;
}
</style>