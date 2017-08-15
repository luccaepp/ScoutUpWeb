<script>
import autoCompleteConfig from '../../funcoesGlobais/algolia/autoCompleteConfig'
  export default {
    mounted(){
        autoCompleteConfig(this)
    }
  }
</script>



<template>
      <!-- NAVBAR -->
      <div class="row">
        <div class="header">
            <nav class="navbar navbar-inverse meu-navbar navbar-fixed-top col-lg-10 col-lg-offset-1 caixombra">

            <div class="navbar-header">
                <router-link to="/"><div class="navbar-brand" id="logo"></div></router-link>                      
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
              <ul id="navbar-right" class="nav navbar-nav navbar-right">
                  <li><form class="navbar-form">
                  <div class="input-group">
                    <input id="inputPesquisarTopBar" type="text" class="form-control" placeholder="Pesquisar">
                    <div id="btnBoxSearchTopBar" class="input-group-btn">
                      <button class="btn btn-default">
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

      </div>
</template>

<style>
  .navbar{
  background-color:#56402E;
  border-radius: 4px;
  border-color: #56402E;
  
}

.dropdown-menu{
    background-color:#56402E;
}
.dropdown-menu > li > a{
  color: #eacf9b !important;

}

#btnBoxSearchTopBar{
  vertical-align: top;
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
  z-index: 5;
}
#logo:hover{
  background-image: url(../../assets/scoutloco.png);
}

.header{
  display:border-box;
}

/* Algolia */

.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #56402E;
  border: 2px solid #EACF9B;
  border-top: none;
  color:#EACF9B;
  font-family: claire;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: rgba(255, 255, 255, .1);
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}

</style>


