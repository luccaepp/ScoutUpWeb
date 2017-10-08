<script>
export default {
  props: ['opcoes'],
  methods: {
      clique(){
          console.log('clique')
      }
  }
}
</script>

<template>
  <div class="box-autocomplete">
      <div @mousedown="$emit('opcaoSelecionada', opcao)" v-for="opcao in opcoes" class="list-group-item">
          {{opcao.data.nome}}
      </div>
  </div>
</template>

<style scoped>
.box-autocomplete{
    position: absolute;
    width: 100%;
    margin-top: 30px;
}
.list-group-item{
    cursor: pointer;
}
.list-group-item:hover{
    background-color: rgb(230, 230, 230);
}
</style>
