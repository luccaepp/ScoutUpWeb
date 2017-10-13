<script>
/* CONSTANTES */
import Materiais from '../../constantes/Atividades/materiais'

export default {
  props: ['selecaoDefault'],
  data(){
      return {
          Materiais,
          materiaisSelecionados: []
      }
  },
  watch: {
      materiaisSelecionados(){
          this.$emit('atualizarMateriaisSelecionados', this.materiaisSelecionados)
      }
  },
  methods: {
      selectOutros(evento){
          let checked = evento.target.checked
          if(checked) this.$emit('outrosSelecionado')
          else this.$emit('outrosNaoSelecionado')

      }
  },
  created(){
      if(this.selecaoDefault) this.materiaisSelecionados = this.selecaoDefault
  }
}
</script>


<template>
    <div class="form-group">
        <label>Materiais Necessários:</label>
        <template v-for="material in Materiais">
            <label class="checkbox-inline">
                <input type="checkbox" :value="material" v-model="materiaisSelecionados">
                {{material}}
            </label>
        </template>
        <label class="checkbox-inline">
            <input @change="selectOutros" type="checkbox">
             Outros
        </label>
    </div>
</template>
