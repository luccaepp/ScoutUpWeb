<script>
    import StPainelInformacoes from './PainelInformacoes.vue'
    import StPainelAmigos from './PainelAmigos.vue'
    import StPainelProgressao from './PainelProgressao.vue'
    import {EventBus} from './../../eventBus'
    import FuncoesFirebaseDatabase from './../../funcoesGlobais/firebase/funcoesDatabase'


    export default{
        components:{
            StPainelInformacoes,
            StPainelAmigos,
            StPainelProgressao
        },
        computed:{
            displayNome(){
                var usuario = this.$store.state.usuario, database = this.$store.state.database
                if(!usuario || !database){
                    console.log('carregando...')
                    return 'Carregando...'
                }
                console.log('entrou no displayNome')
                console.log(this.$store.state.usuarioDatabase)
                var displayUsuario = ''
                if(usuario.displayName){
                    displayUsuario = usuario.displayName
                } else if(this.$store.state.usuarioDatabase){
                    displayUsuario = this.$store.state.usuarioDatabase.nome
                } else if(usuario.user){
                    displayUsuario = usuario.user
                } else{
                    displayUsuario = usuario.email
                }
                return displayUsuario
            }
        }
    }
</script>

<template>
            <div class="container container-main">
            <div class="row">
                <div class="foto-sect text-center">
                    <i class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
                    <br>
                    <b>{{displayNome}}</b>
                </div>
            </div>
            <div class="row">
                <st-painel-informacoes :displayNome="displayNome"></st-painel-informacoes>
            </div>
            <div class="row">
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
                    <st-painel-amigos>
                    </st-painel-amigos>
                    <st-painel-progressao>
                    </st-painel-progressao>
                </div>

            </div>
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
