<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['secoesAtuais', 'grupo'],
    computed: {
        ...mapGetters({database: 'getDatabase', firebase: 'getFirebase', usuarioDatabase: 'getUsuarioDatabase'}),
        naoExistemSecoes(){
            if(!this.secoesAtuais) return true
            if(this.secoesAtuais.length == 0) return true
        }
    },
    methods: {
        secaoSelecionada(secao){
            console.log('Seção selecionada: ', secao)
            if(this.usuarioDatabase.solicitacaoDeEntradaEmSecao){
                bootbox.confirm('Você já pediu para entrar em uma seção.\n Ao enviar essa solicitação, você irá cancelar a solicitação anterior.\n Você tem certeza que quer prosseguir?',
                resultado => {
                    if(resultado){
                        this.enviarSolicitacao(secao)
                    }
                })
            } else{
                this.enviarSolicitacao(secao)
            }
        },
        enviarSolicitacao(secao){
            //Enviando solicitação para a seção
            this.database.ref('/grupo/'+this.grupo['.key']+'/secoes/'+secao['.key']+'/solicitacoes/').push({
                usuario: {
                    nome: this.usuarioDatabase.nome,
                    chave: this.usuarioDatabase['.key']
                },
                timeStamp: this.firebase.database.ServerValue.TIMESTAMP
            }).then(resultado => {
                console.log('Solicitação Enviada', resultado)
                this.database.ref('/usuario/'+this.usuarioDatabase['.key']).update({
                    solicitacaoDeEntradaEmSecao: {
                        nome: secao.nome,
                        chaveSecao: secao['.key'],
                        chaveGrupo: this.grupo['.key'],
                        nomeGrupo: this.grupo.nome
                    }
                })
            }).then(() => this.$router.replace('/usuarios/'+this.usuarioDatabase['.key']))
        }
    }
}

export default vm
</script>

<template>
    <div class="panel panel-grupos">
        <template v-if="naoExistemSecoes">
            <div class="panel-heading text-center nao-ha">
                Não há seções cadastradas nesse grupo :(
            </div>
            <div class="panel-body">
                <div @click="$emit('voltar')" class="list-group-item text-center">
                    Voltar
                </div>
            </div>
        </template>
        <template v-else>
            <div class="panel-heading">
                Solicite a Inscrição na Seção
            </div>
            <table class="table table-grupos text-center">
                <thead>
                    <tr>
                        <th class="text-center">Seção</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="secao in secoesAtuais">
                        <td @click="secaoSelecionada(secao)">{{secao.nome}}</td>
                    </tr>
                </tbody>
            </table>
        </template>

    </div>
</template>

<style scoped>
.list-group-item{
    background-color: #E2C795;
    color: #56402E;
    cursor: pointer;
}
</style>