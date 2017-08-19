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
                        chave: secao['.key']
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