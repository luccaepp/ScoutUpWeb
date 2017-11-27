<script>
    import {mapGetters} from 'vuex'
    import {EventBus} from './../../eventBus'
    import state from '../../store/state'
    import PainelInformacoesBoxes from '../../funcoesGlobais/bootbox/Perfil/PainelInformacoesBoxes'
    var vm = {
        firebase() {
            return {
                grupoDoUsuarioDaPag: {
                    source: this.database.ref('/grupo/'+this.usuarioDaPag.grupo),
                    asObject: true
                }
            }
        },
        watch: {
          'usuarioDaPag'(){
            this.$unbind('grupoDoUsuarioDaPag')
            this.$bindAsObject('grupoDoUsuarioDaPag', this.database.ref('/grupo/'+this.usuarioDaPag.grupo))
          }
        },
        props:['displayNome', 'usuarioDaPag', 'ehDessePerfil'],
        methods: {
        //Esse método só é chamado quando o usuário não está cadastrado em um grupo
        vaParaGrupo(){
              if(this.usuarioDaPag.grupo){
                this.$router.push(`/grupos/${this.usuarioDatabase.grupo}`)
                return
              }

              if(this.usuarioDatabase.tipo == 'escoteiro'){
                //Usuário do tipo Escoteiro

                this.$router.push('/cadastroNaArea')
              } else{
                //Usuário do tipo Escotista
                PainelInformacoesBoxes.dialogOpcoesGrupo(this.$router)
              }
        }
        },
        computed:{
            ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'}),
            secaoExiste(){
                return this.usuarioDaPag ? (this.usuarioDaPag.secao ? true : false) : false
            },
            grupoExiste(){
                return this.usuarioDaPag ? (this.usuarioDaPag.grupo ? true : false) : false
            }
        }
    }


export default vm
</script>


<template>
    <div class="panel panel-info painel-fix-padding">
        <div class="panel-heading"><i class="fa fa-info-circle" aria-hidden="true"></i> Informações</div>
        <div class="panel-body">
            <ul class="list-group text-center">
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Nome:</h4>  <p class="list-group-item-text">{{displayNome}}</p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Grupo:</h4>
                <p v-if="grupoDoUsuarioDaPag && grupoDoUsuarioDaPag['.key'] && grupoDoUsuarioDaPag['.key'] != 'undefined'" class="list-group-item-text">
                    <router-link :to="'/grupos/'+grupoDoUsuarioDaPag['.key']">{{grupoDoUsuarioDaPag.nome}}</router-link>
                </p>
                <p v-else-if="!ehDessePerfil">Nenhum grupo adicionado...</p>
                <!-- É desse perfil -->
                <p v-else-if="!usuarioDaPag.solicitacaoDeEntradaEmSecao">
                    <a class="addd" href="#" @click.prevent="vaParaGrupo">Adicionar um grupo...</a>
                </p>
                <p v-else class="text-warning">
                    {{usuarioDaPag.solicitacaoDeEntradaEmSecao.nomeGrupo}} (Não Confirmado)
                </p>
                </li>
                <!-- Seção -->
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Seção:</h4>
                <p v-if="secaoExiste" class="list-group-item-text">
                    <router-link :to="'/grupos/'+grupoDoUsuarioDaPag['.key']+'/secoes/'+usuarioDaPag.secao.nome">{{usuarioDaPag.secao.nome}}</router-link>
                </p>
                <p v-else-if="!ehDessePerfil">
                    Nenhuma seção adicionada...
                </p>
                <!-- É desse perfil mas não tem seção e nem solicitação de entrada -->
                <template v-else-if="!usuarioDaPag.solicitacaoDeEntradaEmSecao">
                    <p v-if="usuarioDatabase.tipo == 'escotista'"><a href="#" @click.prevent="vaParaGrupo">Adicionar uma sessão...</a></p>
                    <p v-else>Nenhuma seção adicionada...</p>
                </template>
                <!-- É desse perfil e tem solicitação de entrada -->
                <p v-else class="text-warning">{{usuarioDaPag.solicitacaoDeEntradaEmSecao.nome}} (Não confirmado)</p>
                </li>
                <li v-if="usuarioDaPag.tipo == 'escoteiro'" class="list-group-item list-group-item-info">
                    <h4 class="list-group-item-heading">Patrulha: </h4>
                    <p class="list-group-item-text">
                        <span v-if="usuarioDaPag.patrulha">
                            <router-link :to="`/grupos/${usuarioDaPag.grupo}/secoes/${usuarioDaPag.secao.nome}/patrulhas/${usuarioDaPag.patrulha.chave}`">
                              {{usuarioDaPag.patrulha.nome}}
                            </router-link>
                        </span>
                        <span v-else>
                            Nenhuma patrulha adicionada...
                        </span>
                    </p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">E-mail:</h4>
                <p class="list-group-item-text">
                    <span v-if="usuarioDaPag">{{usuarioDaPag.email}}</span>
                    <span v-else><i class="fa fa-spinner fa-spin"></i></span>
                </p>
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped>
@media(max-width: 768px){
    li.list-group-item-info{
        padding: 15px;
    }
}
.panel{
    margin-top: 40px;
}
</style>
