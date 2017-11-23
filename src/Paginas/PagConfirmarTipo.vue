<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../eventBus'

export default {
  data(){
    return {
      tipo: 'escoteiro'
    }
  },
  computed: {
    ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'})
  },
  methods: {
    confirmarTipo(){
      this.database.ref(`/usuario/${this.usuarioDatabase['.key']}/tipo`).set(this.tipo).then(snap => {
        this.$router.replace(`/usuarios/${this.usuarioDatabase['.key']}`)
      })
    }
  },
  beforeCreate(){
    EventBus.$on('usuarioDesconectado', () => {
      this.$router.replace('/')
    })
  }
}
</script>

<template>
  <div class="container">
    <div class="panel panel-info" id="painelINFOOO">
      <div class="panel-heading">
        Selecione o seu tipo de usuário
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label>
            <input v-model="tipo" type="radio" name="tipo" value="escoteiro">
            Escoteiro
          </label>
          <label>
            <input v-model="tipo" type="radio" name="tipo" value="escotista">
            Escotista
          </label>
          <button @click="confirmarTipo()" class="btn btn-success pull-right">Enviar</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
body{
  background-image: url(../assets/paisagem-background.png);
}
</style>
<style scoped>

.panel {
  margin: 30px;
}
</style>
