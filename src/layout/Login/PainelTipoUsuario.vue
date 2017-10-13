<script>
  
</script>

<template>
  <div class="container container-main">
    <form class="text-left col-xs-7">
      <span class="apenas">(Apenas se esta é sua primeira vez aqui)</span>
      <br>
      <span class="text-info"> Sou um: </span>
      <label class="radio-inline" for="radioEscoteiroLogin"><input type="radio" id="radioEscoteiroLogin" name="radioUserLogin" value="escoteiro" v-model="radioText"> Escoteiro</label>
      <label class="radio-inline" for="radioEscotistaLogin"><input type="radio" id="radioEscotistaLogin" name="radioUserLogin" value="escotista" v-model="radioText"> Escotista</label>
    </form>
  </div>
</template>

<style>
</style>
