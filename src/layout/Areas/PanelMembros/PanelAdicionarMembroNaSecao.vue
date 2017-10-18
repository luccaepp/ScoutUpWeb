<script>
import { mapGetters } from 'vuex'

export default {
  props: ['convites', 'secao'],
  computed: {
    ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'})
  },
  methods: {
    aceitarConvite(convite){
      this.database.ref('usuario').child(convite.usuario.chave).update({
        grupo: this.usuarioDatabase.grupo,
        secao: {
          chave: this.secao['.key'],
          nome: this.secao.nome
        }
      }).then(snap => {
        this.database.ref('/grupo/'+this.usuarioDatabase.grupo+'/secoes/'+this.secao['.key']+'/solicitacoes/'+convite['.key']).remove()
      })
    }
  }
}
</script>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <i aria-hidden="true" class="fa fa-crosshairs"></i>
      Convites de Entrada
    </div>
    <div class="panel-body">
      <div class="list-group">
        <button @click="aceitarConvite(convite)" v-for="convite in convites" :key="convite['.key']" class="list-group-item list-group-item-info">
          {{convite.usuario.nome}}
          <i class="fa fa-plus text-success pull-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item-info{
  cursor: pointer;
  outline: none;
}
.list-group-item-info:hover{
  background-color: ;
}
</style>
