<script>
    import StPainelInformacoes from './PainelInformacoes.vue'
    import StPainelAmigos from './PainelAmigos.vue'
    import StPainelProgressao from './PainelProgressao.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from './../../funcoesGlobais/firebase/funcoesDatabase'
    import {mapGetters} from 'vuex'


    export default {
        firebase(){
            return {
                usuarioDaPag: {
                    source: this.database.ref('/usuario/'+this.$route.params.idUsuario),
                    asObject: true,
                    readyCallback(){
                        console.log('usuario da pag', this.usuarioDaPag)
                    }
                }
            }
        },
        components:{
            StPainelInformacoes,
            StPainelAmigos,
            StPainelProgressao
        },
        watch: {
            '$route.params.idUsuario'() {
                this.$unbind('usuarioDaPag')
                this.$bindAsObject('usuarioDaPag', this.database.ref('/usuario/'+this.$route.params.idUsuario))
            }
        },
        computed:{
             ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', usuario: 'getUsuario',
                            firebase: 'getFirebase'}),
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
            cancelarSolicitacao(){
                var ref = this.database.ref('/usuario/'+this.usuarioDaPag['.key']+'/solicitacoesDeAmizade/')
                ref
                .orderByChild('de/chave').equalTo(this.usuarioDatabase['.key']).once('value', snapshot => {
                        let updates = {};
                        snapshot.forEach(child => updates[child.key] = null);
                        ref.update(updates)
                }).catch(erro => {
                        bootbox.alert('Erro! Não foi possível remover a solicitação')
                        console.log(erro)
                    })
            }
        }
    }
</script>

<template>
    <div class="container container-main">
        <div v-if="!usuarioDaPag || !usuario || !usuarioDatabase" class="row text-center">
            <h1 class="carregando">CARREGANDO...</h1>
        </div>
        <template v-else>
            <div class="row">
                <div class="foto-sect text-center">
                    <div class="row">
                        <i class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
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
            <div v-if="ehDessePerfil" class="row">
                <div class="col-lg-2 col-lg-offset-10">
                    <button class="btn btn-warning">
                        Editar
                    </button>
                    <button class="btn btn-primary disabled">
                        Salvar
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="wrapper col-lg-11 col-lg-offset-1">
                    <st-painel-amigos :ehDessePerfil="ehDessePerfil" :usuarioDaPag="usuarioDaPag">
                    </st-painel-amigos>
                    <st-painel-progressao>
                    </st-painel-progressao>
                </div>

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

.foto-perfil{
  font-size: 210px;
}

.foto-amigos{
  font-size: 30px;
}

.painel-fix-padding{
  top: 15px;
  padding-left: 0;
  padding-right: 0;
}


.wrapper{
  padding: 0px;
}


</style>
