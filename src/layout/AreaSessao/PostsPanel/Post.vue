<script>
import StInformacoesPost from './Post/InformacoesPost.vue'
import StDropdownOpcoesPost from './Post/DropdownOpcoesPost.vue'
import StComentariosPanel from './Post/ComentariosPanel.vue'
import StEscrevaUmComentarioPanelFooter from './Post/EscrevaUmComentarioPanelFooter.vue'
var vm = {
    components: {
        StInformacoesPost,
        StDropdownOpcoesPost,
        StComentariosPanel,
        StEscrevaUmComentarioPanelFooter
    }
}
export default vm
</script>

<template>
    <!-- PAINEL DO POST -->
    <div class="panel panel-post panel-transparent col-xs-12">
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-1 col-xs-4 col-md-1 col-lg-1">
                    <i class="fa fa-user-circle foto-perfil" aria-hidden="true"></i>
                </div>
                <st-informacoes-post></st-informacoes-post>
                <st-dropdown-opcoes-post></st-dropdown-opcoes-post>
            </div>

        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 txt-area">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum rutrum venenatis. Ut ut nulla felis. Nam magna neque, tristique at urna vitae, viverra varius ante. Integer hendrerit commodo sodales. Nulla semper urna et enim laoreet auctor. Fusce faucibus volutpat vulputate. Nam feugiat sem eu quam tempus auctor. Suspendisse feugiat sollicitudin semper. Quisque commodo lectus felis, id egestas sapien sagittis vitae. Suspendisse luctus imperdiet fringilla. Nullam molestie eget dolor id interdum. Sed quam nulla, vestibulum sit amet arcu eu, ultricies hendrerit enim. Etiam orci leo, tincidunt posuere velit eget, egestas sagittis sem. Sed vehicula, nisi ac tristique molestie, turpis ex mollis neque, ut tempus magna felis vel ligula. Donec aliquam rutrum sodales.
                </div>
            </div>
            <div class="row">
                <hr>
                <st-comentarios-panel></st-comentarios-panel>
            </div>
        </div>
        <st-escreva-um-comentario-panel-footer></st-escreva-um-comentario-panel-footer>
    </div>
</template>

<style>
.panel-geral-comentarios, .txt-area{
    background-color: rgba(115, 115, 115, .3);
    font-size:18px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.txt-area{
    padding:15px;
    border-radius: 5px;
}
.panel-geral-comentarios{
    margin-bottom: 0;
}
</style>
