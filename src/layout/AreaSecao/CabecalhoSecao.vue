<script>
var vm = {
    props: ['grupo', 'secao']
}
export default vm
</script>
<template>
    <div>
        <span class="nav-esc col-lg-4 col-xs-12 pull-left">
            <router-link :to="'/grupos/'+grupo['.key']">
                <i class="fa fa-building" aria-hidden="true"></i> <span>{{grupo.nome}}</span>
            </router-link> 
            <span>/</span> 
            <router-link :to="$route.path">
                <i aria-hidden="true" class="fa fa-object-group"></i> <span>{{secao.nome}}</span>
            </router-link>
        </span>
        <p class="text-center titulo col-xs-12"><i aria-hidden="true" class="fa fa-object-group text-verdinho"></i>
             <br> 
             <span>{{secao.nome}}</span>
        </p>
    </div>


</template>

<style>
.nav-esc > a{
    color:#eacf9b!important;
    text-decoration: underline;
    font-size: 18px;
}
.titulo{
    font-family: claire;
    font-size: 70px;
}
.text-verdinho, .text-verdinho:active, .text-verdinho:hover{
    color:#B9C159;
}
</style>