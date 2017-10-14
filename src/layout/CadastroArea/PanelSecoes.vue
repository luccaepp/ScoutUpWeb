<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['secoesAtuais', 'grupo'],
    computed: {
        ...mapGetters({database: 'getDatabase', firebase: 'getFirebase', usuarioDatabase: 'getUsuarioDatabase'})
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
                        chaveSolicitacao: resultado.key
                    }
                })
            })
        }
    }
}

export default vm
</script>

<template>
    <div class="panel panel-grupos">
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
    </div>
</template>

<style>
    
</style>