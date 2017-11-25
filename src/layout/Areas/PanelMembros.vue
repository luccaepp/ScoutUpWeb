<script>
import StDropdownOpcoesUsuario from './DropdownOpcoesUsuario.vue'
import {mapGetters} from 'vuex'
import StPanelSelecionarMembroSecao from './PanelMembros/PanelSelecionarMembroSecao.vue'
import StPanelAdicionarMembroNaSecao from './PanelMembros/PanelAdicionarMembroNaSecao.vue'
var vm = {
    props: ['area', 'tipoArea', 'ehEscotistaDaArea', 'secaoPatrulha'],
    components: {
        StPanelSelecionarMembroSecao,
        StPanelAdicionarMembroNaSecao,
        StDropdownOpcoesUsuario
    },
    data(){
        return {
            adicionandoMembrosPatrulha: false,
            membros: '',
            convitesDaSecao: []
        }
    },
    firebase(){
        return {

        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        exibirMembros(){
            if(this.area && this.membros){
                return true
            } else{
                console.log('Panel Membros - computed da área', this.area)
                //Caso a área exista e seja válida
                if(this.area && this.area['.key']){
                    //Caso a área seja do tipo grupo
                    if(this.tipoArea == 'grupo'){
                        this.$bindAsArray('membros', this.database
                                .ref('/usuario/')
                                .orderByChild(this.tipoArea)
                                .equalTo(this.area['.key']))
                    //Caso a área seja do tipo seção
                    } else if(this.tipoArea == 'secao' || this.tipoArea == 'patrulha'){
                        this.$bindAsArray('membros', this.database
                                    .ref('/usuario/')
                                    .orderByChild(this.tipoArea+'/chave')
                                    .equalTo(this.area['.key']), null)
                    }
                }
                return false
            }
        }
    },
    watch: {
        membros(){
            this.$emit('membrosAtualizados', this.membros)
        }
    },
    created(){
        if(this.tipoArea == 'secao' && this.ehEscotistaDaArea) {
          this.$bindAsArray('convitesDaSecao', this.database.ref('grupo')
                                                            .child(this.usuarioDatabase.grupo)
                                                            .child('secoes')
                                                            .child(this.area['.key'])
                                                            .child('solicitacoes')
                                                          )
      }
    },
    methods:{
        isVoceMesmo(usuario){
            return this.usuarioDatabase['.key'] === usuario['.key']
        }
    }
}
export default vm
</script>

<template>
    <div class="panel panel-warning">
        <div class="panel-heading">
            <i aria-hidden="true" class="fa fa-user-circle"></i> Membros
        </div>
        <div class="panel-body">
            <ul v-if="exibirMembros" class="list-group">
                <!-- Esse <li> é pra adicionar membros na seção -->
                <li v-if="(ehEscotistaDaArea || usuarioDatabase.tipo == 'escotista') && tipoArea=='secao' && convitesDaSecao.length != 0">
                  <st-panel-adicionar-membro-na-secao :secao="area" :convites="convitesDaSecao"></st-panel-adicionar-membro-na-secao>
                </li>
                <li v-for="membro in membros" :key="membro['.key']" class="list-group-item list-group-item-warning">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    <router-link class="text-warning" :to="'/usuarios/'+membro['.key']">{{membro.nome}}</router-link>
                                        <st-dropdown-opcoes-usuario :usuario="membro" :tipoArea="tipoArea" v-if="(ehEscotistaDaArea || usuarioDatabase.tipo == 'escotista') && !isVoceMesmo(membro)"></st-dropdown-opcoes-usuario>
                </li>
                <!-- Esse <li> serve apenas para o panelMembros da Área de Patrulha -->
                <li v-if="(ehEscotistaDaArea || usuarioDatabase.tipo == 'escotista') && tipoArea=='patrulha'" class="list-group-item list-group-item-warning">
                    <span v-if="!adicionandoMembrosPatrulha" @click="adicionandoMembrosPatrulha = true"
                        id="addMembrosPatrulha"><i class="fa fa-plus text-success" aria-hidden="true"></i> Adicionar Membros</span>
                    <st-panel-selecionar-membro-secao @pararDeExibir="adicionandoMembrosPatrulha = false" :membrosAtuais="membros"
                        v-if="adicionandoMembrosPatrulha" :secao="secaoPatrulha" :patrulha="area">
                    </st-panel-selecionar-membro-secao>
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped>
.fa-user-circle{
    font-size: 18px;
}
::-webkit-scrollbar-thumb {
  background: #EACF9B;
  border: 22px none #ffffff;
  border-radius: 50px;
}
</style>
<style>
#addMembrosPatrulha{
    cursor: pointer;
}
#addMembrosPatrulha:hover{
    text-decoration: underline;
}
</style>
