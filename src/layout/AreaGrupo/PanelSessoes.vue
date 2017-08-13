<script>
import { mapGetters } from 'vuex'
import CadastrarSecao from '../../funcoesGlobais/bootbox/PanelSecoes/CadastrarSecao'
var vm = {
    props: ['grupo'],
    firebase(){
        return {
        }
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', firebase: 'getFirebase'}),
        usuarioEhEscotistaDoGrupo(){
            return this.usuarioDatabase.tipo == 'escotista' && this.usuarioDatabase.grupo.key == this.grupo.key
        },
        PATHLIST(){
            return {tipo: 'secao', path: '/grupo/'+this.grupo['.key']+'/secoes/'}
        }
    },
    methods: {
        adicionarSecao(){
            CadastrarSecao(this)
        },
        retornaLinkSecao(secao){
            return '/grupos/'+this.grupo['.key']+'/secoes/'+(secao.nome).replace(' ', '_')

        }
    }
}

export default vm
</script>

<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <i aria-hidden="true" class="fa fa-object-group"></i> Seções
        </div>
        <div class="panel-body">
            <ul class="list-group">
                <!-- Caso nenhum grupo tenha sido carregado ainda -->
                <span v-if="!grupo" class="text-info">
                    Carregando...
                </span>
                <!-- Caso o grupo tenha sido carregado e tenha seções cadastradas -->
                <template v-else-if="grupo.secoes">
                    <li v-for="secao in grupo.secoes" class="list-group-item list-group-item-info">
                        <i aria-hidden="true" class="fa fa-object-group"></i> 
                        <router-link :to="retornaLinkSecao(secao)">{{secao.nome}}</router-link>
                    </li>
                </template>
                <!-- Caso o grupo não tenha seções cadastradas -->
                <template v-else>
                    <li class="list-group-item list-group-item-info">Nenhuma seção neste grupo...</li>
                </template>
                <!-- Caso o usuário logado seja um escotista do grupo -->
                <template v-if="usuarioEhEscotistaDoGrupo" class="list-group">
                    <li class="list-group-item list-group-item-info">
                        <span class="adicionarSec" @click.prevent="adicionarSecao">
                            <i class="fa fa-plus text-success" aria-hidden="true"></i>
                            Adicionar uma Seção
                        </span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.adicionarSec{
    cursor:pointer;
}
.adicionarSec:hover{
    text-decoration: underline;
}
</style>