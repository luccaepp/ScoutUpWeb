<script>
import {mapGetters} from 'vuex'
export default {
  firebase(){
      return {
        grupos: this.database.ref('/grupo/')
      }
  },
  computed: {
      ...mapGetters({database: 'getDatabase'})
  }
}
</script>

<template>
  <form>
      <p>Lista de Grupos:</p>
      <div class="list-group">
          <template v-if="!grupos">
              Nenhum grupo carregado ainda...
          </template>
          <template v-else v-for="grupo in grupos">
            <div class="list-group-item list-group-item-success"> <i class="fa fa-plus" aria-hidden="true"></i> {{grupo.nome}}</div>
          </template>
      </div>
  </form>
</template>

<style scoped>
.list-group-item{
    cursor: pointer;
}    
.list-group-item:hover{
    text-decoration: underline;
}
</style>
