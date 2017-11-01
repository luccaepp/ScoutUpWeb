<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['secao', 'membrosAtuais', 'patrulha'],
    firebase(){
        return {
            membrosSecao: this.database.ref('usuario').orderByChild('secao/chave').equalTo(this.secao['.key'])
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'}),
        escoteirosMembrosSecao(){
          return this.membrosSecao.filter(val => val.tipo == 'escoteiro')
        }
    },
    data(){
        return {
            itensSelecionados: []
        }
    },
    methods: {
        adicionarMembros(){
            this.itensSelecionados.forEach(membro => {
                this.database.ref('usuario').child(membro['.key']).child('patrulha').set({
                    chave: this.patrulha['.key'],
                    nome: this.patrulha.nome
                })
            })
        },
        selecionarMembro(membroSelecionado, evento){
            const item_success = 'list-group-item-success',
                item = 'list-group-item', item_info = 'list-group-item-info'

            if(this.itensSelecionados.includes(membroSelecionado)){
                this.itensSelecionados.splice(this.itensSelecionados.indexOf(membroSelecionado), 1)
                evento.target.className = item + ' ' + item_info
            } else{
                this.itensSelecionados.push(membroSelecionado)
                evento.target.className = item + ' ' + item_success
            }
        },
        contemMembro(membro){
            return this.membrosAtuais.filter(membroAtual => membroAtual['.key'] == membro['.key']).length == 0
        },
        pararDeExibir(){
            this.$emit('pararDeExibir')
        }
    }
}
export default vm
</script>

<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <i class="fa fa-crosshairs" aria-hidden="true"></i>
            Selecione Membros
        </div>
        <div class="panel-body">
            <ul class="list-group">
                <template v-for="membro in escoteirosMembrosSecao">
                    <li v-if="contemMembro(membro) && !membro.patrulha" @click="selecionarMembro(membro, $event)"
                        class="list-group-item list-group-item-info">
                        <i aria-hidden="true" class="fa fa-user-circle"></i>
                        {{membro.nome}}
                    </li>
                </template>
            </ul>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="btn-toolbar pull-right">
                    <button @click="pararDeExibir()" class="btn btn-warning">
                        Cancelar
                    </button>
                    <button @click="adicionarMembros()" class="btn btn-info">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
li{
    cursor:pointer;
}
li:hover{
    text-decoration: underline;
    background-color: rgba(255, 255, 255, .5)
}
</style>
