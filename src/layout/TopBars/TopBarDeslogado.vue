<script>
    import StTopBarPrototipo from './TopBarPrototipo.vue'
    export default {

        components: {
            StTopBarPrototipo
        }
    }
</script>



<template>
  <st-top-bar-prototipo :logado="false">
      <ul slot="lis-navbar" class="nav navbar-nav list-inline">
        <li>
            <router-link to="/o-projeto" id="a1" class="a">O Projeto</router-link>
        </li>
        <li>
            <router-link to="/sobre-nos" id="a2" class="a">Sobre Nós</router-link>
        </li>
      </ul>
      <template slot="lis-login">
        <li><router-link to="/cadastro"><span class="glyphicon glyphicon-user"></span> Cadastrar-se</router-link></li>
        <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span> Entrar</router-link></li>
      </template>
      
    </st-top-bar-prototipo>
</template>
