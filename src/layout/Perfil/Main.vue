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
        computed:{ ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase', usuario: 'getUsuario'}),
            displayNome(){
                var usuario = this.usuario, database = this.database
                if(!usuario || !database || !this.usuarioDatabase || !this.usuarioDaPag){
                    console.log('carregando...')
                    return 'Carregando...'
                }
                return this.usuarioDaPag.nome
            },
            ehDessePerfil(){
                return this.usuario.uid == this.usuarioDaPag['.key']
            }
        }
    }
</script>

<template>
    <div class="container container-main">
        <div v-if="!usuario" class="row text-center">
            <h1 class="carregando">CARREGANDO...</h1>
        </div>
        <template v-else>
            <div class="row">
                <div class="foto-sect text-center">
                    <i class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
                    <br>
                    <b>{{displayNome}}</b>
                </div>
            </div>
            <div class="row">
                <st-painel-informacoes :ehDessePerfil="ehDessePerfil" :usuarioDaPag = "usuarioDaPag" 
                    :displayNome="displayNome"></st-painel-informacoes>
            </div>
            <div class="row">
                <div class="col-lg-2 col-lg-offset-10">
                    <button v-if="ehDessePerfil" class="btn btn-warning">
                        Editar
                    </button>
                    <button class="btn btn-primary disabled">
                        Salvar
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="wrapper col-lg-11 col-lg-offset-1">
                    <st-painel-amigos>
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

.painel-progressao, .painel-amigos{
  height: 250px!important;
}

.wrapper{
  padding: 0px;
}


</style>
