<script>
    import StPainelInformacoes from './PainelInformacoes.vue'
    import StPainelAmigos from './PainelAmigos.vue'
    import StPainelProgressao from './PainelProgressao.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from './../../funcoesGlobais/firebase/funcoesDatabase'
    import {mapGetters} from 'vuex'

    import LeitorIMG from '../../funcoesGlobais/DOM/LeitorIMG'

const readyCallbackUsuarioDaPag = function(snap){
                    console.log('usuarioDaPagExiste main', snap.exists())
                    EventBus.$emit('usuarioDaPagExiste', snap.exists())
                        console.log('usuario da pag', this.usuarioDaPag)
                    }

    export default {
        firebase(){
            return {
                usuarioDaPag: {
                    source: this.database.ref('/usuario/'+this.$route.params.idUsuario),
                    asObject: true,
                    readyCallback: readyCallbackUsuarioDaPag
                }
            }
        },
        components:{
            StPainelInformacoes,
            StPainelAmigos,
            StPainelProgressao
        },
        data(){
            return {
                storageRef: null,
                srcFoto: '',
                usuarioDaPagExiste: false
            }
        },
        watch: {
            '$route.params.idUsuario'() {
                this.$unbind('usuarioDaPag')
                this.$bindAsObject('usuarioDaPag', this.database.ref('/usuario/'+this.$route.params.idUsuario), null, readyCallbackUsuarioDaPag)
                this.atualizarFotoDePerfil()
            }
        },
        computed:{
             ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', usuario: 'getUsuario',
                            firebase: 'getFirebase', storage: 'getStorage'}),
            displayNome(){
                var usuario = this.usuario, database = this.database
                if(!usuario || !database || !this.usuarioDatabase || !this.usuarioDaPag){
                    console.log('carregando...')
                    return 'Carregando...'
                }
                return this.usuarioDaPag.nome
            },
            ehDessePerfil(){
                var uid = this.usuario.uid,
                uidPag = this.usuarioDaPag['.key']
                return uid == uidPag
            },
            ehAmigo(){
                return this.usuarioDaPag.amigos
                            ? Object.keys(this.usuarioDaPag.amigos).map(key => this.usuarioDaPag.amigos[key].chave)
                                .indexOf(this.usuarioDatabase['.key']) != -1
                            : false
            },
            solicitacaoEnviada(){
                return this.usuarioDaPag.solicitacoesDeAmizade
                        ? Object.keys(this.usuarioDaPag.solicitacoesDeAmizade).map(key => this.usuarioDaPag.solicitacoesDeAmizade[key].de.chave)
                                .indexOf(this.usuario.uid) != -1
                        : false
            }
        },
        methods: {
            adicionarAmigo(){
                this.database.ref('/usuario/'+this.usuarioDaPag['.key']+'/solicitacoesDeAmizade/').push({
                    de: {
                        nome: this.usuarioDatabase.nome,
                        chave: this.usuarioDatabase['.key']
                    },
                    timeStamp: this.firebase.database.ServerValue.TIMESTAMP
                }).catch(erro => {
                    bootbox.alert('Erro! Não foi possível adicionar o amigo')
                    console.log(erro)
                })
            },
            atualizarFotoDePerfil(){
                this.storageRef = this.storage.ref('/fotoPerfil/' + this.$route.params.idUsuario)
                let self = this
                this.storageRef.getDownloadURL().then(url => self.srcFoto = url, erro => this.srcFoto = '')
            },
            cancelarSolicitacao(){
                var ref = this.database.ref('/usuario/'+this.usuarioDaPag['.key']+'/solicitacoesDeAmizade/')
                ref
                .orderByChild('de/chave').equalTo(this.usuarioDatabase['.key']).once('value', snapshot => {
                        var updates = {};
                        snapshot.forEach(child => updates[child.key] = null);
                        ref.update(updates)
                }).catch(erro => {
                        bootbox.alert('Erro! Não foi possível remover a solicitação')
                        console.log(erro)
                    })
            },
            trocarFotoDePerfil(){
                let self = this
                if(this.ehDessePerfil){
                    let input = LeitorIMG.buildLeitorFoto(mudanca => self.storageRef.put(mudanca.target.files[0])
                                                                                    .then(resultado => self.atualizarFotoDePerfil()))
                    input.click()
                }
            }
        },
        created(){
            this.atualizarFotoDePerfil()
        }
    }
</script>

<template>
    <div class="container container-main">
        <div v-if="!usuarioDaPag || !usuario || !usuarioDatabase" class="row text-center">
            <h1 class="carregando"><i class="fa fa-spinner fa-spin"></i></h1>
        </div>
        <template v-else>
            <div class="row">
                <div class="foto-sect text-center">
                    <div class="row">
                        <i v-if="!srcFoto" @click="trocarFotoDePerfil()" class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
                        <img v-else @click="trocarFotoDePerfil()" class="foto-perfil" :src="srcFoto">
                        <br>
                        <b>{{displayNome}}</b>
                    </div>
                    <div class="row">
                        <div class="col-xs-10 col-xs-offset-1">
                            <button @click="adicionarAmigo()" class="btn btn-success pull-right" id="btnAdicionarAmigo"
                                v-if="!ehDessePerfil && !ehAmigo && !solicitacaoEnviada">
                            Adicionar amigo
                            </button>
                            <button @click="cancelarSolicitacao()" class="btn btn-danger pull-right" v-if="solicitacaoEnviada">
                                Cancelar Solicitação
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <st-painel-informacoes :ehDessePerfil="ehDessePerfil" :usuarioDaPag = "usuarioDaPag"
                    :displayNome="displayNome"></st-painel-informacoes>
            </div>
            <div class="row">
                <st-painel-amigos :ehDessePerfil="ehDessePerfil" :usuarioDaPag="usuarioDaPag">
                </st-painel-amigos>
                <st-painel-progressao v-if="usuarioDaPag.tipo == 'escoteiro'" :usuarioDaPag="usuarioDaPag">
                </st-painel-progressao>
            </div>
        </template>

    </div>
</template>

<style>

.foto-sect{
  font-size: 30px;
  font-family: claire, Verdana;
  color:#eacf9b;

}

i.foto-perfil{
  font-size: 210px;
}

.foto-perfil{
    cursor: pointer;
}

img.foto-perfil{
    width: 210px;
    height: 210px;
    border-radius: 150px;
    background-color: transparent;
}

.foto-amigos{
  font-size: 30px;
}

.painel-fix-padding{
  top: 15px;
  padding-left: 0;
  padding-right: 0;
}



</style>
