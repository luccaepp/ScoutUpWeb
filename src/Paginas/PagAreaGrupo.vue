<script>
import { mapGetters } from 'vuex'
import StMain from '../layout/AreaGrupo/Main.vue'
var vm = {
    components: {
        StMain
    },
    computed: {
        ...mapGetters({database: 'getDatabase', firebase: 'getFirebase', usuarioDatabase: 'getUsuarioDatabase'})
    }
}

export default vm
</script>

<template>
    <st-main></st-main>
</template>

<style>
body{
    background-image: url(../assets/paisagem-background.png);
}
hr{
    height: 1px;
    background-color: #eacf9b;
    margin-bottom: 0;
}

.panel-transparent{
    background-color: transparent;
}

.panel-title{
    font-family: claire;

}


.panel-header::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  background: #56402e;
}
.panel-header{
    background-color: #493727!important;
    
}

.menu-opt-post{
    margin-top: 10px;
}

.menu-opt-post li :hover{
    background-color: #846246 !important;
}
.glyphicon-chevron-down{
    color:#eacf9b!important;
}

.foto-perfil, .foto-comment{
    font-size: 60px;
    color: #eacf9b;
}
.foto-comment{
    padding: 0;
}

.dropdown-menu{
    border: 1px solid #eacf9b;
}

.divider{
    background-color: #eacf9b!important;
}
.panel-footer{
    background-color: transparent;
}
.panel-comment {
	position:relative;
    border:1px solid #47723E;;
    background-color:#47723E;
    padding:1px;
}

.panel-comment > .panel-body{
    border-radius:3px;
    color:#47723E;
}

/*Flecha do Comment*/
.panel-comment>.panel-heading:after,.panel>.panel-heading:before{
	position:absolute;
	top:11px;left:-16px;
	right:100%;
	width:0;
	height:0;
	display:block;
	content:" ";
	border-color:transparent;
	border-style:solid solid outset;
	pointer-events:none;
}

.panel-comment>.panel-heading:before{
	border-right-color:#47723E;
	border-width:15px;
    margin-top:-10px;
    margin-left: -10px;
}

.panel-comment > .panel-heading > strong{
    font-family: claire;
    color: #B9C159;
}

.panel-comment > .panel-heading{
    background-color:#47723E;
    height: 60px;
}

.panel-comment > .panel-heading a{
    font-family: claire!important;
    color: #B9C159!important;
    font-size: 18px;
}

.panel-comment > .panel-body{
    background-color: #B9C159;
}

.panel-geral-comentarios{
    margin-bottom: 0;
}

.realizar-separator{
    margin-bottom:30px;
}
</style>