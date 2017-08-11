<script>
import { mapGetters } from 'vuex'
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
        }
    },
    methods: {
        adicionarSecao(){
            var isso = this
            bootbox.prompt("Qual o nome da Seção a ser cadastrada?", nome => {
                //Tratando input vazio 
                if(nome == '') { 
                    bootbox.dialog({
                        message: 'Informe um nome para a seção!',
                        buttons: {
                            cancelar: {
                                label: 'Cancelar',
                                className: 'btn-warning',
                                callback(){}
                            },                            
                            confirmar: {
                                label: 'OK',
                                className: 'btn-success',
                                callback(){
                                    isso.adicionarSecao()
                                }
                            }

                        }
                    })
                } 
                //Tratando inserção da seção
                else{
                    this.database.ref('/grupo/'+this.grupo['.key']+'/secoes/').push({
                        nome,
                        timeStamp: this.firebase.database.ServerValue.TIMESTAMP,
                        criador: {
                            'nome': this.usuarioDatabase.nome,
                            'chave': this.usuarioDatabase['.key']
                        }
                    }).then(snap => {
                        this.database.ref('/usuario/'+this.usuarioDatabase['.key']).update({
                            secao: {
                                chave: snap.key,
                                'nome': nome
                            } 
                        })
                    })
                }
            })
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
            Seções
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
                        <a href="#" @click.prevent="adicionarSecao">
                            <i class="fa fa-plus text-success" aria-hidden="true"></i>
                            Adicionar uma Seção
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>