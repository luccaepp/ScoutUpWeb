<script>
    import StTopBarPrototipo from './TopBarPrototipo.vue'
    export default {

        components: {
            StTopBarPrototipo
        }
    }
</script>



<template>
  <st-top-bar-prototipo>
      <ul slot="lis-navbar" class="nav navbar-nav list-inline">
        <li>
            <a href="#" id="a1" class="a">O Projeto</a>
        </li>
        <li>
            <a href="#" id="a2" class="a">Sobre Nós</a>
        </li>
        <li>
            <a href="#" id="a3" class="a">Contato</a>
        </li>
      </ul>
      <template slot="lis-login">
        <li><router-link to="/cadastro"><span class="glyphicon glyphicon-user"></span> Cadastrar-se</router-link></li>
        <li><router-link to="/cadastro"><span class="glyphicon glyphicon-log-in"></span> Entrar</router-link></li>
      </template>
      
    </st-top-bar-prototipo>
</template>
