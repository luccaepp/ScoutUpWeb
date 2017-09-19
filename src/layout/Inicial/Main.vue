<script>
import { Carousel, Slide } from 'vue-carousel';
  export default {
    components: {
      Carousel, Slide
    },
    data(){
      return {
        nextLabel: '<i id="next" class="fa fa-chevron-right" aria-hidden="true"></i>',
        previousLabel: '<i id="prev" class="fa fa-chevron-left" aria-hidden="true"></i>'
      }
    }
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
            <carousel paginationActiveColor="#B9C159" paginationColor="#EACF9B" :navigationPrevLabel="previousLabel" :navigationNextLabel="nextLabel" :perPage="1" 
                      :navigationEnabled="true">
              <slide>
                <div class="row">
                  <div class="col-xs-4 col-xs-offset-1">
                    <div class="markt col-xs-10 col-xs-offset-1">
                      <i class="fa fa-android icone" aria-hidden="true"></i>
                      <p>Aplicativo <br> Android</p>
                    </div>
                  </div>
                    <div class="col-xs-12 col-sm-6">
                      <div class="well">
                        <p class="texto-feature"><i class="fa fa-map-marker" aria-hidden="true"></i> Chamada via GPS</p>
                        <p class="texto-feature"><i class="fa fa-envelope-o" aria-hidden="true"></i> Envie Notificações</p>
                      </div>
                    </div>
                </div>
              </slide>
              <slide>
                <div class="col-xs-4 col-xs-offset-1">
                  <div class="markt col-xs-10 col-xs-offset-1">
                    <i class="fa fa-calendar icone" aria-hidden="true"></i>
                    <p>Calendário <br> de <br> Atividades</p>
                  </div>
                </div>
                  <div class="col-xs-12 col-sm-6">
                    <div class="well">
                      <p class="texto-feature"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> Adicione Atividades</p>
                      <p class="texto-feature"><i class="fa fa-building-o" aria-hidden="true"></i> Convide Grupos</p>
                    </div>
                  </div>
              </slide>
              <slide>
                <div class="col-xs-4 col-xs-offset-1">
                  <div class="markt col-xs-10 col-xs-offset-1">
                    <i class="fa fa-share-alt icone" aria-hidden="true"></i>
                    <p>Compartilhe <br> com o <br> seu Grupo</p>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="well">
                      <p class="texto-feature"><i class="fa fa-clipboard" aria-hidden="true"></i> Faça Posts</p>
                      <p class="texto-feature"><i class="fa fa-level-up" aria-hidden="true"></i> Faça Avaliações</p>
                    </div>
                </div>
              </slide>
            </carousel>
          </div>

        </div>
      </div>
</template>

<style>
#prev, #next{
  font-size: 100px;
  color: #EACF9B;
}
#prev:hover, #next:hover{
  opacity: .4;
}
#prev{
  margin-right: -72px;
}
#next{
  margin-left: -72px;
}
</style>


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
    padding: 10px 30px 10px 30px;
  }

  .fa-map-marker{
    font-size: 90px;
  }
  .fa-envelope-o{
    font-size: 70px;
  }

  .texto-feature{
    font-size: 50px;
    font-family: claire;
  }

  .well{
    background-color:rgba(234,207,155,.7);
    color:#56402E;
    border-color: #56402E;
    border-width: 2px;
    border-radius: 15px;
    margin-top: 22px;
  }

  .markt{
    height: 300px;
    width: 300px;
    background-color: #B9C159;
    border-radius: 150px;
    text-align: center;
    z-index: 0;
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
