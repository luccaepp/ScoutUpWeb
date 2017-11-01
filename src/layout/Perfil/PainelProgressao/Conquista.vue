<script>
export default {
  props: ['urlIMG']
}
</script>

<template>
  <div class="box-principal">
    kk eae
    <img :src="urlIMG" alt="Ícone da progressão">
  </div>
</template>

<style>
.box-principal{
  width: 120px;
  height: 150px;
  border: 2px solid #56402E;
  border-radius: 5px;
  background-color: #FCF8E3;
}
</style>
