<script>
import {mapGetters} from 'vuex'
import InputComAutocomplete from './TopBarPrototipo/InputComAutocomplete.vue'
  export default {
    props: ['logado', 'dropdownExpandido'],
    components: {
      InputComAutocomplete
    },
    data(){
      return {
        hideTopBar: false,
        usuarioBuscado: null,
        expanded: false
      }
    },
    watch: {
      hideTopBar(){
        console.log('trocou', this.hideTopBar)
        this.chch()
      }
    },
    computed: {
      ...mapGetters({usuario: 'getUsuario'})
    },
    methods: {
      chch(){
        if(this.$refs.toggleado)
          this.expanded = window.getComputedStyle(this.$refs.toggleado).display === 'none'
        else this.expanded = false
      }
    }
  }
</script>



<template>
      <!-- NAVBAR -->
        <transition name="hideTopBar">
          <div key="header" v-if="!hideTopBar" class="header">
              <nav class="navbar navbar-inverse meu-navbar navbar-fixed-top col-lg-10 col-xs-12 col-lg-offset-1 caixombra">

              <div class="navbar-header">
                  <router-link to="/"><div class="navbar-brand" id="logo"></div></router-link>
                  <button @click="chch" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#toggleado">
                    <span class="sr-only">Botão de Toggle</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
              </div>

              <div ref="toggleado" class="collapse navbar-collapse col-lg-6" id="toggleado">
                  <slot name="lis-navbar"></slot>
                </div>
                <ul id="navbar-right" class="nav navbar-nav navbar-right">
                    <li v-if="usuario">
                      <form class="navbar-form">
                      <div class="input-group">
                        <input-com-autocomplete></input-com-autocomplete>
                        <div id="btnBoxSearchTopBar" class="input-group-btn">
                          <button class="btn btn-default">
                            <i class="glyphicon glyphicon-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </li>
                    <slot name="lis-login">
                    </slot>
                  </ul>


              </nav>
              <div class="col-xs-2 col-xs-offset-10">
                <i @click="hideTopBar = true"
                 :class="{
                   'dropdownExpandido': dropdownExpandido,
                   'chevron-logado': logado,
                   'chevron-deslogado': !logado,
                   'expandido': expanded,
                   'n-expandido': !expanded
                 }"
                 class="fa fa-chevron-circle-up" aria-hidden="true"></i>
              </div>
          </div>
          <div id="opt-mostrar-top-bar" key="mostrarHeader" v-else>
            <div class="container">
              <div class="col-xs-12 text-center">
                  <i @click="hideTopBar = false;chch()" class="fa fa-chevron-circle-down" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </transition>

</template>

<style scoped>
.fa-chevron-circle-down{
  font-size: 100px;
  cursor: pointer;
  color: #56402E;
  opacity: .7;
}
.fa-chevron-circle-up{
  position: absolute;
  font-size: 30px;
  z-index: 10000;
  color: #EACF9B;
  top: 50px;
  cursor: pointer;

}

@media(max-width: 1239px){
  .fa-chevron-circle-up{
      top: 88px;
  }
}

@media(max-width: 1200px){
    .fa-chevron-circle-up{
      top: 105px;
      right: 90px;
  }
}

@media(max-width: 767px){
    .fa-chevron-circle-up{
      border-color: #56402E;
      border-style: solid;
      display: inline-block;
      border-radius: 300px;
      width: 45px;
      height: 45px;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 45px;
  }

  /* Esse é o dropdown externo */
  .expandido{
    top: 900px;
  } 

  /* Esse é o dropdown interno */
  .dropdownExpandido{
    top: 410px!important;
  }

  .chevron-deslogado.n-expandido{
      top: 150px;
      right: 30px;
    -webkit-transition: ease 0.5s;
    -moz-transition: ease 0.5s;
    transition: ease 0.5s;
  }

  .chevron-deslogado.expandido{
    -webkit-transition: ease 0.5s;
    -moz-transition: ease 0.5s;
    transition: ease 0.5s;
    top: 240px;
    right: 30px;
  }

  .chevron-logado.n-expandido{
      top: 210px;
      right: 30px;
    -webkit-transition: ease 0.5s;
    -moz-transition: ease 0.5s;
    transition: ease 0.5s;
  }

  .chevron-logado.expandido{
    -webkit-transition: ease 0.5s;
    -moz-transition: ease 0.5s;
    transition: ease 0.5s;
    top: 310px;
    right: 30px;
  }
}
</style>

<style>

#opt-mostrar-top-bar{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 11;
}

.hideTopBar-enter-active{
  transition: all .4s ease;
}

.hideTopBar-leave-active{
  transition: all .4s ease;
}

.hideTopBar-enter, .hideTopBar-leave-to{
  transform: translateY(-700px);
}

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
  position: fixed;
  top: 0;
  width: 100%;
  clear: both;
  z-index: 10;
}
</style>
