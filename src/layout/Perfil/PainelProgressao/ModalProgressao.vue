<script>
import StItemEspecialidade from './ModalProgressao/ItemEspecialidade.vue'
import StItemInteresseEspecial from './ModalProgressao/ItemInteresseEspecial.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        StItemEspecialidade,
        StItemInteresseEspecial
    },
    props: ['itemAtivo', 'usuarioDaPag'],
    data(){
        return {
            escopo: ''
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'})
    },
    firebase(){
        return { }
    },
    watch: {
        itemAtivo(){
            if(this.itemAtivo){
                console.log('itemAtivo', this.itemAtivo)
                this.$bindAsArray('escopo', this.database.ref(this.itemAtivo.dbPATH))
            }
        }
    }
}
</script>

<template>
  <div id="modalProgressao" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">
                    <template v-if="itemAtivo.nome">{{itemAtivo.nome}}</template>
                    <template v-else>
                        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    </template>
                </h4>
              </div>
              <div class="modal-body">
                  <template v-if="itemAtivo.tipo == 'especialidade'">
                    <st-item-especialidade v-for="item in escopo" :item="item" :especialidade="itemAtivo.db" 
                                            :key="item['.key']" :usuarioDaPag="usuarioDaPag"></st-item-especialidade>
                  </template>
                  <template v-else-if="itemAtivo.tipo == 'interesse_especial'">
                      <st-item-interesse-especial v-for="item in escopo" :key="item['.key']" :item="item" :insignia="itemAtivo" :usuarioDaPag="usuarioDaPag">
                      </st-item-interesse-especial>
                  </template>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>

