<script>
    import {mapGetters} from 'vuex'
    import {EventBus} from './../../eventBus'
    import state from '../../store/state'
    import PainelInformacoesBoxes from '../../funcoesGlobais/bootbox/Perfil/PainelInformacoesBoxes'
    var vm = {
        firebase() {
            return {
                grupoDoUsuarioDaPag: {
                    source: this.database.ref('/grupo/'+this.usuarioDaPag.grupo)
                }
            }
        },
        data(){
            return {
                grupo: ''
            }
        },
        props:['displayNome', 'usuarioDaPag', 'ehDessePerfil'],
        methods: {
        //Esse método só é chamado quando o usuário não está cadastrado em um grupo
        vaParaGrupo(){
              if(!usuarioDaPag.grupo){
                return
              }
              if(usuarioDatabase.tipo == 'escoteiro'){
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
                return this.usuarioDatabase ? (this.usuarioDatabase.secao ? true : false) : false
            },
            grupoExiste(){
                return this.usuarioDatabase ? (this.usuarioDatabase.grupo ? true : false) : false
            }
        },
        created(){
            if(this.usuarioDatabase && this.usuarioDatabase.grupo){
                this.$bindAsObject('grupo', this.database.ref('/grupo/'+this.usuarioDatabase.grupo))
            }
        }
    }

//     //Funções Separadas que geraram loop infinito como computed//
function displayGrupo(usuarioDatabase, vm){

}


export default vm
</script>


<template>
    <div class="panel panel-info col-lg-10 col-lg-offset-1 painel-fix-padding">
        <div class="panel-heading"><i class="fa fa-info-circle" aria-hidden="true"></i> Informações</div>
        <div class="panel-body">
            <ul class="list-group text-center">
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Nome:</h4>  <p class="list-group-item-text">{{displayNome}}</p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Grupo:</h4>
                <p v-if="grupo['.key']" class="list-group-item-text">
                    <router-link :to="'/grupos/'+grupo['.key']">{{grupo.nome}}</router-link>
                </p>
                <p v-else-if="!ehDessePerfil">Nenhum grupo adicionado...</p>
                <p v-else><a href="#" @click.prevent="vaParaGrupo">Adicionar um grupo...</a></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">Seção:</h4>
                <p v-if="secaoExiste" class="list-group-item-text">
                    <router-link :to="'/grupos/'+grupo['.key']+'/secoes/'+usuarioDatabase.secao.nome">{{usuarioDatabase.secao.nome}}</router-link>
                </p>
                <p v-else><router-link to="/cadastroNaArea">Adicionar uma sessão...</router-link></p>
                </li>
                <li class="list-group-item list-group-item-info">
                <h4 class="list-group-item-heading">E-mail:</h4>
                <p class="list-group-item-text">
                    <span v-if="$store.state.usuario">{{$store.state.usuario.email}}</span>
                    <span v-else>Carregando...</span>
                </p>
                </li>
            </ul>

        </div>
    </div>
</template>
