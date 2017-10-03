<script>
import MateriaisDefault from '../../../../constantes/Atividades/materiais'

export default {
  props: ['materiais'],
  data(){
      return {}
  },
  computed: {
    outrosMateriais(){
        let self = this
        return MateriaisDefault.filter(material => self.materiais.indexOf(material) == -1)
    }
  }
}
</script>

<template>
  <!-- Modal Pra Alterar Os Materiais Da Atividade -->
  <div class="modal fade" id="modalAlterarMateriaisAtividade" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Materiais Necessários</h4> 
              </div>
              <div class="modal-body">
                <h5>Materiais Adicionados</h5>
                <div class="list-group">
                    <div class="list-group-item list-group-item-success" v-for="material in materiais">
                        {{material}}
                    </div>
                </div>
                <h5>Outros Materiais</h5>
                <div class="list-group">
                    <div class="list-group-item list-group-item-warning" v-for="material in outrosMateriais">
                        {{material}}
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style>

</style>


