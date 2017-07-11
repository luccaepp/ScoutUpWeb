<template>
    <div class="col-lg-5 panel panel-info caixombra">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3 img-container">
                    <img class="scout-image" src="../../assets/logo-azul.png" alt="Logo do ScoutUp!">  
                </div>            
            </div>
            <div class="row">
                <h2 class="col-xs-6 col-xs-offset-3 text-center" id="cad">FAÇA LOGIN</h2>
            </div>
        </div>
    <div class="panel-body">
      <div class="row">
        <div class="form-group text-center">
          <input class="form-control" type="text" placeholder="Digite seu E-mail">
          <input type="password" class="form-control" placeholder="Digite sua Senha">
        <i class="fa fa-facebook-square" aria-hidden="true"></i>
        <i class="fa fa-google-plus-square" aria-hidden="true"></i>
        <i class="fa fa-twitter-square" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="btn-toolbar">
        <button class="btn btn-success pull-right">Confirmar</button>
      </div>
    </div>
    </div>
</template>

<style scoped>
    .fa{
        font-size: 128px;
        margin-right:10px;
        cursor:pointer;
    }
    .fa-facebook-square{
        color:#3B5998;
    }
    .fa-google-plus-square{
        color:#EA4335;
    }
    .fa-twitter-square{
        color:#2AA9E0;
    }
</style>