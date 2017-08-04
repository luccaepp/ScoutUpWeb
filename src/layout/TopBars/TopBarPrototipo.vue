<script>
  export default {
    methods: {
      cadastrar(){

      }
    }
  }
</script>



<template>
      <!-- NAVBAR -->
      <div class="row header">
        <nav class="navbar navbar-inverse meu-navbar navbar-fixed-top col-lg-10 col-lg-offset-1 caixombra">

                  <div class="navbar-header">
                      <a href="/"><div class="navbar-brand" id="logo"></div></a>                      
                      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#toggleado">
                        <span class="sr-only">Botão de Toggle</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                  </div>
                                    
                  <div class="collapse navbar-collapse col-lg-6" id="toggleado">
                      <slot name="lis-navbar"></slot>
                   </div> 
                   <ul class="nav navbar-nav navbar-right">
                      <li><form class="navbar-form navbar-right">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Pesquisar">
                        <div class="input-group-btn">
                          <button class="btn btn-default" type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                          </button>
                        </div>
                      </div>
                    </form></li>
                      <slot name="lis-login">
                      </slot>
                    </ul>

        </nav>
      </div>
</template>

<style>
  .navbar{
  position: relative;
  background-color:#56402E;
  border-radius: 4px;
  padding: 8px;
  border-color: #56402E;
  
}

.dropdown-menu{
    background-color:#56402E;
}
.dropdown-menu > li > a{
  color: #eacf9b !important;

}

.navbar-inverse .navbar-nav > .open > a{
  background-color: rgba(0,0,0,.2) !important;
  border-radius: 100px;
}

.meu-navbar .navbar-nav > li > a {
    color: #eacf9b !important;
    font-size: 17px;
    
}

.caixombra{
  /*Box-shadow*/
  -webkit-box-shadow: 8px 10px 18px -1px rgba(0,0,0,0.75);
  -moz-box-shadow: 8px 10px 18px -1px rgba(0,0,0,0.75);
  box-shadow: 8px 10px 18px -1px rgba(0,0,0,0.75);
}

#logo{
  width: 100px;
  height: 58px;
  background-image: url(../../assets/scoutlogo.png);
  background-repeat: no-repeat;
  cursor: pointer;
  margin-bottom: 10px;

}
#logo:hover{
  background-image: url(../../assets/scoutloco.png);
}

</style>


