<script>
import {mapGetters} from 'vuex'
var vm = {
  firebase(){
    return {
      grupos: this.database.ref('/grupo/')
    }
  },
  data(){
    return {
      busca: ''
    }
  },
  computed: {
    ...mapGetters({database: 'getDatabase'}),
    listaFiltrada(){
      let padrao = new RegExp(this.busca, 'i')
      if(!this.busca){
        return this.grupos
      }

      let filtrado = this.grupos.filter((grupo) => {
        return padrao.test(grupo.nome)
      })
      console.log('filtrado', filtrado)
      return filtrado
    }
  },
  methods: {
    selecionarGrupo(grupo){
      if(!grupo){
        return
      }
      this.$emit('grupoSelecionado', grupo)
    }
  }
}

export default vm
</script>

<template>
  <div class="panel panel-grupos">
    <div class="panel-heading">
      Solicite a Inscrição no Grupo
    </div>
    <table class="table table-grupos text-center">
        <thead>
            <tr>
                <th class="text-center">Grupo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="grupo in listaFiltrada" @click="selecionarGrupo(grupo)">
                <td>{{grupo.nome}}</td>
            </tr>
        </tbody>

    </table>
    <div class="panel-footer">
      <div class="row">
        <div class="col-xs-4 pull-right">
          <input v-model="busca" class="form-control" type="text" placeholder="Busque um grupo...">
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
