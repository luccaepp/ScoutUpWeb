<script>
import {mapGetters} from 'vuex'
import StCabecalhoPatrulha from '../AreaPatrulha/CabecalhoPatrulha.vue'
import StPanelInformacoes from '../Areas/PanelInformacoes.vue'
import StPanelMembros from '../Areas/PanelMembros.vue'
import StPanelRealizarPost from '../Areas/PanelRealizarPost.vue'
import StPostsPanel from '../PostsPanel/PostsPanel.vue'

var vm = {
    components: {
        StCabecalhoPatrulha,
        StPanelInformacoes,
        StPanelMembros,
        StPanelRealizarPost,
        StPostsPanel
    },
    data(){
        return {
            patrulha: '',
            membros: []
        }
    },
    firebase(){
        return {
            grupo: {
                source: this.database.ref('/grupo/'+this.$route.params.idGrupo),
                asObject: true,
                readyCallback(snap){
                    console.log('readyGrupo', this.grupo)
                }
            },
            secao: {
                source: this.database.ref('/grupo/'+this.$route.params.idGrupo).child('secoes').orderByChild('nome')
                                                 .equalTo(this.$route.params.idSecao
                                                    .replace('_', ' ')),
                asObject: false,
                readyCallback(snap){
                    console.log('secao ready', this.getSecao)
                    //A patrulha depende do ready da seção
                    this.$bindAsObject('patrulha', this.$firebaseRefs.secao
                                                .child(this.getSecao['.key'])
                                                .child('patrulhas')
                                                .child(this.$route.params.idPatrulha))
                }
            }
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        ehDessaPatrulha(){
            //Alguma patrulha foi carregada?
            if(!this.getPatrulha){
                //O usuário não é dessa patrulha
                return false
            }
            //O Usuário tem patrulha
            if(!this.usuarioDatabase.patrulha){
                return false
            }
            //A chave da patrulha do usuário é igual a chave da patrulha sendo exibida?
            if(this.usuarioDatabase.patrulha.chave == this.getPatrulha['.key']){
                //O usuário é dessa patrulha
                return true
            }
            //O usuário não é dessa patrulha
            return false
        },
        ehEscotistaDaPatrulha(){
            if(!this.secao || !this.grupo) return false

            if(!this.usuarioDatabase.secao){
                //O usuário não tem uma seção
                return false
            }
            if(this.usuarioDatabase.tipo != 'escotista') return false
            //A chave da seção do usuário é igual a chave da seção sendo exibida?
            if(this.usuarioDatabase.secao.chave == this.getSecao['.key']){
                //O usuário é dessa seção
                return true
            }
            //O usuário não é dessa seção
            return false
        },
        //GETTERS DE ÁREAS
        getGrupo(){
            if(this.grupo && this.grupo['.key']){
                console.log('getGrupo', this.grupo)
                return this.grupo
            }
            return false
        },
        getSecao(){
            if(this.secao[0] && this.secao[0]['.key']){
                console.log('getSecao', this.secao)
                return this.secao[0]
            }
            return false
        },
        getPatrulha(){
            if(this.patrulha && this.patrulha['.key']){
                console.log('getPatrulha', this.patrulha)
                return this.patrulha
            }
            return false
        },
        pathParaPatrulha(){
            return '/grupo/'+this.$route.params.idGrupo+'/secoes/'+this.getSecao['.key']+'/patrulhas/'+this.getPatrulha['.key']
        }
    },
    methods: {
        desinscreverse(){
            bootbox.confirm('Você tem certeza que quer sair dessa patrulha?', confirmacao => {
                if(!confirmacao) return
                this.database.ref('usuario').child(this.usuarioDatabase['.key']).child('patrulha').remove()
            })
        },
        atualizarMembros(m){
            this.membros = m
        }
    }
}

export default vm
</script>

<template>
   <div class="container area">
        <div v-if="!usuarioDatabase || !usuarioDatabase.grupo || !patrulha || !getGrupo || !getSecao || !getPatrulha">
            <h1 class="text-center carregando"><i class="fa fa-spinner fa-spin"></i></h1>
        </div>
        <div v-else>
            <div class="row">
                <st-cabecalho-patrulha :secao="getSecao" :grupo="getGrupo" :patrulha="getPatrulha"></st-cabecalho-patrulha>
            </div>
            <div class="row">
                <st-panel-informacoes @desinscreverse="desinscreverse()" :ehDessaArea="ehDessaPatrulha" :ehEscotistaDaArea="ehEscotistaDaPatrulha" :area="getPatrulha"></st-panel-informacoes>
            </div>
            <div class="row">
                <st-panel-membros @membrosAtualizados="atualizarMembros" :secaoPatrulha="getSecao" :ehEscotistaDaArea="ehEscotistaDaPatrulha" :area="getPatrulha"
                    tipoArea="patrulha"></st-panel-membros>
            </div>
            <div v-if="ehDessaPatrulha" class="row">
                <st-panel-realizar-post :pathParaArea="pathParaPatrulha"></st-panel-realizar-post>
            </div>
            <div class="row">
                <hr class="realizar-separator">
            </div>
            <div class="row">
                <st-posts-panel :ehDessaArea="ehDessaPatrulha" :area="getPatrulha" :pathParaArea="pathParaPatrulha"></st-posts-panel>
            </div>
        </div>
   </div>
</template>

<style>
.area{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 40px;
  color: #eacf9b;
}
.realizar-separator{
    margin-bottom:30px;
}
</style>
