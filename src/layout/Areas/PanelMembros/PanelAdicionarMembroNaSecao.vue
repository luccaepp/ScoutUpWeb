<script>
import { mapGetters } from 'vuex'

export default {
  props: ['convites', 'secao'],
  computed: {
    ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
    refSolicitacoesDaSecao(){
      return this.database.ref('grupo')
                          .child(this.usuarioDatabase.grupo)
                          .child('secoes')
                          .child(this.secao['.key'])
                          .child('solicitacoes')
    }
  },
  methods: {
    aceitarConvite(convite){
      let self = this
      this.getRefDoUsuarioDoConvite(convite).update({
        grupo: this.usuarioDatabase.grupo,
        secao: {
          chave: this.secao['.key'],
          nome: this.secao.nome
        }
      }).then(snap => self.removerConvite(convite))
    },
    removerConvite(convite){
      let self = this
      this.getRefDoUsuarioDoConvite(convite)
          .child('solicitacaoDeEntradaEmSecao')
          .remove()
          .then(rmSnap => self.refSolicitacoesDaSecao.child(convite['.key']).remove())
    },
    getRefDoUsuarioDoConvite(conv){
      return this.database.ref('usuario').child(conv.usuario.chave)
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
        <div v-for="convite in convites" :key="convite['.key']" class="list-group-item list-group-item-info">
          <div class="row">

            <div class="flexboxinvitador">
              <span class="nomeInvitador">
                {{convite.usuario.nome}}
              </span>
              <button class="btn btn-danger" @click="removerConvite(convite)">
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>
              <button class="btn btn-success" @click="aceitarConvite(convite)">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flexboxinvitador{
  display: flex;
  justify-content: flex-end;
}
.list-group-item-info{
  cursor: pointer;
  outline: none;
}
.nomeInvitador{
  flex-grow: 2;
  padding: 5px;
}
.btn-success, .btn-danger{
  margin-right: 5px;
}
</style>
