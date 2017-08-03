<script>
  export default {

  }
</script>

<template>
      <div class="row">
        <!-- PAINEL DE BOAS VINDAS -->
        <div class="container markt-box caixombra">
          <div class="row">
              <div class="texto-intro text-center col-lg-12">
              <div class="mensagem-inicial">
                <img src="../../assets/logo_scoutup_maior.png" alt="Logo ScoutUp" id="scout_image">
              </div>
              <div class="heading">
                Uma Rede Social para Escoteiros
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="markt">
                <i class="fa fa-android icone" aria-hidden="true"></i>
                <p>Aplicativo <br> Android</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="markt">
                <i class="fa fa-calendar icone" aria-hidden="true"></i>
                <p>Calendário <br> de <br> Atividades</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="markt">
                <i class="fa fa-share-alt icone" aria-hidden="true"></i>
                <p>Compartilhe <br> com o <br> seu Grupo</p>
              </div>
            </div>

            <button class="btn btn-warning col-lg-1 col-lg-offset-11">Saiba Mais</button>
          </div>

        </div>
      </div>
</template>


<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Pangolin');

  .texto-intro{
    border-radius: 5px;
    padding: 10px;
  }

  .mensagem-inicial{
    font-family: 'Pangolin', Verdana, Arial;
    font-size: 90px;
    color: #eacf9b;
  }

  .heading{
    font-family: 'Pangolin', Verdana, Arial;
    color: #eacf9b;
  }

  .markt-box{
    background-color: rgba(86,64,46, .8);
    border-radius: 10px;
  }

  .markt{
    height: 300px;
    width: 300px;
    background-color: #B9C159;
    border-radius: 150px;
    text-align: center;
    z-index: 0;
    margin: 0 auto;
    margin-bottom: 10px;
    font-family: 'Pangolin', Verdana, Arial;
    font-size: 20px;
    padding-top: 20px;
  }

  .icone{
    font-size: 170px;
    margin-bottom: 10px;
    color: #47723E;
  }

  #scout_image{
    width: 350px;
    height: 200px;
  }

</style>
