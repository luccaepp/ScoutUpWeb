<script>
export default {
  props: ['infoIMG', 'borda', 'tipo'],
  data(){
    return {
      hoverado: false
    }
  }
}
</script>

<template>
  <div data-toggle="modal" data-target="#modalProgressao" :class="{bordado: borda, desbordado: !borda}" class="box-principal">
    <img @mouseover="hoverado = true" 
         :src="infoIMG.url" alt="Ícone da progressão">
    <div @click="$emit('mostrarProgressao', infoIMG)" class="text-center" v-if="hoverado" @mouseout="hoverado = false"
         :class="{pretidao: hoverado}">
      {{infoIMG.nome}}
    </div>
  </div>
</template>

<style scoped>
.box-principal{
  width: 120px;
  height: 120px;
  background-color: #FCF8E3;
}
.bordado{
  border: 2px solid #56402E;
  border-radius: 5px;
}
.desbordado{
  display: flex;
  justify-content: center;
  align-items: center;
}
img{
  width: 116px;
  height: 116px;
}
.pretidao{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: #FCF8E3;
  font-family: claire;
  font-size: 22px;

  width: 95%;
  height: 95%;
  background-color: rgba(86, 64, 46, .9);
  top: 5%;
  left: 5%;
  padding: 5px;

  border-radius: 4px;
  cursor: pointer;
}
</style>
