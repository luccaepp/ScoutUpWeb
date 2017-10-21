<script>
var vm = {
    props: ['grupo']
}
export default vm
</script>
<template>
    <div>
        <span class="nav-esc col-lg-3 col-xs-12 pull-left">
            <router-link :to="$route.path">
                <i class="fa fa-building" aria-hidden="true"></i> <span>{{grupo.nome}}</span>
            </router-link>
        </span>
        <p class="text-center titulo col-xs-12"><i class="fa fa-building text-verdinho" aria-hidden="true"></i>
             <br> 
             <span>{{grupo.nome}}</span>
        </p>
    </div>


</template>

<style>
@media(max-height: 768px){
    .titulo{
        font-size: 50px!important;
    }
    .nav-esc{
        margin-top: 35px;
    }
}
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