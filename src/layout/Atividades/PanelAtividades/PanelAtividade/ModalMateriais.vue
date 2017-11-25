<script>
import MateriaisDefault from '../../../../constantes/Atividades/materiais'

export default {
  props: ['materiais'],
  data(){
      return {
          outrosMateriais: [],
          txtMaterial: ''
      }
  },
  methods: {
      removerMaterial(material){
          this.$emit('removerMaterial', material)
          if(MateriaisDefault.indexOf(material) != -1)
            this.outrosMateriais.push(material)
      },
      adicionarMaterial(material){
          if(!material) return bootbox.alert("Material sem nome.")
          this.$emit('adicionarMaterial', material)
          if(this.outrosMateriais.indexOf(material) != -1)
            this.outrosMateriais.splice(this.outrosMateriais.indexOf(material), 1)
      }
  },
  created(){
    let self = this
    this.outrosMateriais = MateriaisDefault.filter(material => self.materiais.indexOf(material) == -1)
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
                <h5>Materiais Atuais</h5>
                <div class="list-group">
                    <div class="list-group-item list-group-item-default" v-if="materiais.length == 0">
                        Nenhum Material :(
                    </div>
                    <div v-else @click="removerMaterial(material)" class="list-group-item list-group-item-success" v-for="material in materiais">
                        {{material}}
                        <span class="pull-right"><i class="fa fa-times text-danger" aria-hidden="true"></i></span>
                    </div>
                </div>
                <h5>Outros Materiais</h5>
                <div class="list-group">
                    <div @click="adicionarMaterial(material)" class="list-group-item list-group-item-warning" v-for="material in outrosMateriais">
                        {{material}}
                        <span class="pull-right"><i class="fa fa-plus text-success" aria-hidden="true"></i></span>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                  <div class="input-group">
                      <input v-model="txtMaterial" placeholder="Escreva o nome do material a ser adicionado" type="text" class="form-control">
                      <div class="input-group-btn">
                        <button @click="adicionarMaterial(txtMaterial)" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i></button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
.list-group-item{
    cursor: pointer;
}
.list-group-item-default{
    cursor: initial;
}
.list-group-item-success:hover{
    background-color: #F2DEDE;
    color: #AF504E;
}
.list-group-item-warning:hover{
    background-color: #DFF0D8;
    color: #3C763D;
}
</style>


