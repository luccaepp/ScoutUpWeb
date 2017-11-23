<script>
import {mapGetters} from 'vuex'
import CadastrarPatrulha from '../../funcoesGlobais/bootbox/PanelPatrulhas/CadastrarPatrulha'
var vm = {
    props: ['secao', 'pathParaSecao'],
    firebase(){
        return {
            patrulhas: {
                source: this.database.ref(this.pathParaSecao+'/patrulhas'),
                asObject: false,
                readyCallback(){
                    console.log('patrulhas carregadas: ', this.pathParaSecao, this.patrulhas)
                }
            }
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase', firebase: 'getFirebase'}),
        usuarioEhEscotistaDaSecao(){
            if(!this.secao){
                return false
            }
            //Tipo do usuario é igual a escotista?
            return this.usuarioDatabase.tipo == 'escotista' && 
                                    //O usuário tem uma seção?
                                    (this.usuarioDatabase.secao
                                        //A chave da seção do usuário é igual a chave da seção que está sendo exibida? 
                                        ? this.usuarioDatabase.secao.chave == this.secao['.key']
                                            //O usuário é um escotista dessa seção
                                            ? true
                                            //O usuário foi o criador dessa seção?
                                            : this.usuarioDatabase['.key'] == this.secao.criador.chave
                                                //O usuário é um escotista dessa seção
                                                ? true
                                                //O usuário não é um escotista dessa seção
                                                : false
                                        //O usuário não tem uma seção, portanto não é o escotista dessa seção
                                        : false)
                },
        PATHLIST(){
            return {tipo: 'patrulha', path: '/grupo/'+this.$route.params.idGrupo+'/secoes/'+this.secao['.key']+'/patrulhas'}
        }
    },
    methods: {
        retornaLinkPatrulha(patrulha){
            return '/grupos/'+this.$route.params.idGrupo+'/secoes/'+this.secao.nome+'/patrulhas/'+patrulha['.key']
        },
        adicionarPatrulha(){
            CadastrarPatrulha(this)
        }
    }
}

export default vm
</script>

<template>
    <div class="panel panel-success">
        <div class="panel-heading">
            <i aria-hidden="true" class="fa fa-users"></i> Patrulhas
        </div>
        <div class="panel-body">
            <ul class="list-group">
                <!-- Caso a seção não tenha sido carregada ainda -->
                <span v-if="!secao" class="text-success">
                    <i class="fa fa-spinner fa-spin"></i>
                </span>
                <!-- Caso a seção tenha sido carregada e tenha patrulhas para mostrar -->
                <template v-else-if="patrulhas.length">
                    <li v-for="patrulha in patrulhas" class="list-group-item list-group-item-success text-success">
                        <i aria-hidden="true" class="fa fa-users"></i> 
                        <router-link :to="retornaLinkPatrulha(patrulha)">{{patrulha.nome}}</router-link>
                    </li>
                </template>
                <!-- Caso a seção não tenha patrulhas cadastradas -->
                <template v-else>
                    <li class="list-group-item list-group-item-success text-success">
                        Nenhuma patrulha cadastrada nessa seção...
                    </li>
                </template>
                <template v-if="usuarioEhEscotistaDaSecao">
                    <li class="list-group-item list-group-item-success">
                        <span @click="adicionarPatrulha()" class="adicionarPatrulha text-success">
                            <i class="fa fa-plus text-success" aria-hidden="true"></i>
                            Adicionar uma Patrulha
                        </span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<style>
span.adicionarPatrulha{
    cursor:pointer;
}
span.adicionarPatrulha:hover{
    text-decoration: underline;
}
</style>