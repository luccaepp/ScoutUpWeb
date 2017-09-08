<script>
import {mapGetters} from 'vuex'
export default {
  props: ['convidados'],
  data(){
      return {
          nomeAtual: '',
          grupos: []
      }
  },
  firebase(){
      return { }
  },
  computed: {
      ...mapGetters({database: 'getDatabase'})
  },
  watch: {
      nomeAtual(){
          if(this.nomeAtual){
              this.$bindAsArray('grupos', this.database.ref('/grupo/').limitToFirst(10).orderByChild('nome').startAt(this.nomeAtual.replace(/\b\w/g, l => l.toUpperCase())))
          }
      }
  },
  methods: {
      adicionarRemoverGrupo(grupo){
          if(this.estaNosConvidados(grupo))
            this.$emit('removerConvidado', grupo['.key'])
          else
            this.$emit('adicionarGrupo', grupo)
          
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
      <p>Lista de Grupos:</p>
      <div class="list-group">
          <template v-if="grupos.length == 0">
            <div class="list-group-item list-group-item-warning">
              Nenhum Grupo a ser mostrado...
            </div>
          </template>
          <template v-else v-for="grupo in grupos">
            <div class="list-group-item" :class="{'list-group-item-success': !estaNosConvidados(grupo), 'list-group-item-danger': estaNosConvidados(grupo)}" 
                @click="adicionarRemoverGrupo(grupo)">
                <i  v-if="estaNosConvidados(grupo)" class="fa fa-minus" aria-hidden="true"></i>
                <i v-else class="fa fa-plus" aria-hidden="true"></i> 
                {{grupo.nome}}
            </div>
          </template>
      </div>
      <input class="form-control" type="text" placeholder="Busque o nome de um Grupo" v-model="nomeAtual">
  </form>
</template>

<style scoped>
.list-group-item-success, .list-group-item-danger{
  cursor: pointer;
}
.list-group-item-success:hover, .list-group-item-danger:hover{
    text-decoration: underline;
}
</style>
