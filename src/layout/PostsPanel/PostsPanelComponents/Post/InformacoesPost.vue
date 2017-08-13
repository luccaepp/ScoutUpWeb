<script>
import FormatadorDeTimeStamp from '../../../../funcoesGlobais/timeStamp/timeStamp'
var vm = {
    props: ['post'],
    methods: {
        retornaTimeStampFormatado(timeStamp){
            return FormatadorDeTimeStamp.retornaTimeStampFormatado(timeStamp)
        }
    }
}
export default vm
</script>
<template>
    <div class="col-sm-3 col-xs-2 col-md-4 col-lg-5">
        <div class="col-lg-offset-1 col-sm-offset-1 col-md-offset-0 col-xs-offset-3">
            <h3 class="autor-post">{{post.usuarioGerador.nome}}</h3>
            <span class="data-post">{{retornaTimeStampFormatado(post.timeStamp)}}</span>
        </div>
    </div>
</template>

<style>
.autor-post{
    font-family: claire!important;
}
.data-post{
    font-size: 12px;
    position: relative;
    top: -10px;
}
</style>