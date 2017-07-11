<script>
    import StPainelInformacoes from './PainelInformacoes.vue'
    import StPainelAmigos from './PainelAmigos.vue'
    import StPainelProgressao from './PainelProgressao.vue'
    export default{
        components:{
            StPainelInformacoes,
            StPainelAmigos,
            StPainelProgressao
        }
    }
</script>

<template>
            <div class="container container-main">
            <div class="row">
                <div class="foto-sect text-center">
                    <i class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
                    <br>
                    <b>Joesley</b>
                </div>
            </div>
            <div class="row">
                <st-painel-informacoes></st-painel-informacoes>
            </div>
            <div class="row">
                <div class="col-lg-2 col-lg-offset-10">
                    <button class="btn btn-warning">
                        Editar
                    </button>
                    <button class="btn btn-primary disabled">
                        Salvar
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="wrapper col-lg-11 col-lg-offset-1">
                    <st-painel-amigos>
                    </st-painel-amigos>
                    <st-painel-progressao>
                    </st-painel-progressao>
                </div>
                
            </div>
        </div>
</template>

<style>



body{
    background-image: url(../../assets/paisagem-background.png);
}

.container-main{
  background-color: rgba(86,64,46, .5);
  border-radius: 10px;
  padding: 50px;
  font-size: 18px;
}

.foto-sect{
  font-size: 30px;
  font-family: claire, Verdana;
  color:#eacf9b;

}

.foto-perfil{
  font-size: 210px;
}

.foto-amigos{
  font-size: 30px;
}

.painel-fix-padding{
  margin-top: 20px;
  padding-left: 0;
  padding-right: 0;
}

.painel-progressao, .painel-amigos{
  height: 250px;
}

.wrapper{
  padding: 0px;
}

</style>