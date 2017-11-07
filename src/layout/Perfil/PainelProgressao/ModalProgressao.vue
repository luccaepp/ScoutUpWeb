<script>
import StItemEspecialidade from './ModalProgressao/ItemEspecialidade.vue'
import { mapGetters } from 'vuex'
import removerAcentos from '../../../funcoesGlobais/string/removerAcentos'

export default {
    components: {
        StItemEspecialidade
    },
    props: ['itemAtivo'],
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
                this.$bindAsArray('escopo', this.database.ref('escopoProgressao')
                                 .child('especialidades')
                                 .child(this.removerAcentos(this.itemAtivo.toLowerCase()))
                                 )
            }
        }
    },
    methods: {
        removerAcentos(str){
            return removerAcentos(str)
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
                    <template v-if="itemAtivo">{{itemAtivo}}</template>
                    <template v-else>
                        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    </template>
                </h4>
              </div>
              <div class="modal-body">
                  <st-item-especialidade v-for="item in escopo" :item="item" :especialidade="removerAcentos(itemAtivo)" :key="item['.key']"></st-item-especialidade>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>

