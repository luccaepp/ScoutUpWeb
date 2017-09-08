<script>
import {mapGetters} from 'vuex'
export default {
  props: ['convidados'],
  data(){
    return {
      nomeGrupoAtual: '',
      chaveGrupoSelecionado: '',
      secoes: [],
      grupos: [],
      secoesAdicionadas: []
    }
  },
  firebase(){
    return { }
  },
  computed: {
      ...mapGetters({database: 'getDatabase'})
  },
  watch: {
      nomeGrupoAtual(){
          if(this.nomeGrupoAtual){
              this.$bindAsArray('grupos', this.database.ref('/grupo/').limitToFirst(10).orderByChild('nome').startAt(this.nomeGrupoAtual.replace(/\b\w/g, l => l.toUpperCase())))
          }
      },
      chaveGrupoSelecionado(){
        if(!this.chaveGrupoSelecionado)
          return
        this.$bindAsArray('secoes', this.database.ref('/grupo/').child(this.chaveGrupoSelecionado).child('secoes'))
      }
  },
  methods: {
    adicionarRemoverSecao(secao){
      if(this.estaNosConvidados(secao))
        this.$emit('removerConvidado', secao['.key'])
      else
        this.$emit('adicionarSecao', {secao, chaveGrupo: this.chaveGrupoSelecionado})
    },
    estaNosConvidados(parteHierarquica){
      //Se for encontrado algum resultado, retorne true
      return this.convidados.filter(conv => conv.chave == parteHierarquica['.key']).length > 0
    }
  }
}
</script>

<template>
    <form>
      <!-- Lista de Grupos -->
      <p>Lista de Grupos: </p>
        <div class="list-group">
          <template v-if="grupos.length == 0">
            <div class="list-group-item list-group-item-warning">
              Nenhum Grupo a ser mostrado...
            </div>
          </template>
          <template v-else v-for="grupo in grupos">
            <template v-if="!estaNosConvidados(grupo)">
              <label class="list-group-item list-group-item-grupo">
                <input type="radio" :value="grupo['.key']" v-model="chaveGrupoSelecionado"> {{grupo.nome}}
              </label>
            </template>
          </template>
      </div>
      <input class="form-control" type="text" placeholder="Busque o nome de um Grupo" v-model="nomeGrupoAtual">
      <!-- Lista de Seções -->
      <p class="paragrafo-secoes">Lista de Seções: </p>
      <div class="list-group">
          <template v-if="secoes.length == 0">
            <div class="list-group-item list-group-item-warning">
              Nenhuma Seção a ser mostrada...
            </div>
          </template>
          <template v-else v-for="secao in secoes">
            <div class="list-group-item" :class="{'list-group-item-success': !estaNosConvidados(secao), 'list-group-item-danger': estaNosConvidados(secao)}" 
              @click="adicionarRemoverSecao(secao)"> 
              <i  v-if="estaNosConvidados(secao)" class="fa fa-minus" aria-hidden="true"></i>
              <i v-else class="fa fa-plus" aria-hidden="true"></i> 
              {{secao.nome}}
            </div>
          </template>
      </div>
    </form>
</template>

<style scoped>
p{
  margin-top: 10px!important;
}
.list-group-item-success, .list-group-item-grupo, .list-group-item-danger{
  cursor: pointer;
}
.list-group-item-grupo:hover{
  background-color: rgba(0, 0, 0, .1);
}
.list-group-item-success:hover, .list-group-item-danger:hover{
    text-decoration: underline;
}
</style>
