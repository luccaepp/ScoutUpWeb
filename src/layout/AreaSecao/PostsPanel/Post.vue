<script>
import StInformacoesPost from './Post/InformacoesPost.vue'
import StDropdownOpcoesPost from './Post/DropdownOpcoesPost.vue'
import StComentariosPanel from './Post/ComentariosPanel.vue'
import {mapGetters} from 'vuex'
var vm = {
    props: ['post', 'secao'],
    components: {
        StInformacoesPost,
        StDropdownOpcoesPost,
        StComentariosPanel
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        pathParaOPost(){
            return '/grupo/'+this.$route.params.idGrupo+'/secoes/'+this.secao['.key']+'/posts/'+this.post['.key']
        },
        postUpado(){
            return this.numeroDeUps != 0 
                    ? Object.values(this.post.avaliacao.ups).indexOf(this.usuarioDatabase['.key']) != -1 
                        ? true 
                        : false
                    : false
        },
        postDownsado(){
            return this.numeroDeDowns != 0 
                    ? Object.values(this.post.avaliacao.downs).indexOf(this.usuarioDatabase['.key']) != -1 
                        ? true 
                        : false
                    : false
        },
        numeroDeUps(){
            return this.post.avaliacao 
                    ? this.post.avaliacao.ups 
                        ? Object.keys(this.post.avaliacao.ups).length 
                        : 0 
                    : 0
        },
        numeroDeDowns(){
            return this.post.avaliacao 
                    ? this.post.avaliacao.downs 
                        ? Object.keys(this.post.avaliacao.downs).length 
                        : 0 
                    : 0
        }
    },
    methods: {
        upar(){
            //Caso o post já tenha sido upado, remova esse up
            if(this.postUpado){
                this.removerUp()
                return
            }
            //Caso o post tenha sido downsado, remova o down e adicione um up
            if(this.postDownsado){
                this.removerDown()
            }
            //Adicionando o Up
            this.adicionar('ups')
        },
        downsar(){
            //Caso o post já tenha sido downsado, remova esse down
            if(this.postDownsado){
                this.removerDown()
                return
            }
            //Caso o post tenha sido upado, remova o up e adicione um down
            if(this.postUpado){
                this.removerUp()
            }
            //Adicionando o Down
            this.adicionar('downs')
        },
        adicionar(upDown){
            this.database.ref(this.pathParaOPost+'/avaliacao/'+upDown+'/').push(this.usuarioDatabase['.key'])
        },
        removerUp(){
            //Verificando qual a key do Up realizado
            Object.keys(this.post.avaliacao.ups).forEach(keyUp => {
                if(this.post.avaliacao.ups[keyUp] == this.usuarioDatabase['.key']){
                    //encontrou a key, remova o Up da database
                    this.database.ref(this.pathParaOPost+'/avaliacao/ups/'+keyUp).remove()
                }
            })
        },
        removerDown(){
            //Verificando qual a key do Down realizado
            Object.keys(this.post.avaliacao.downs).forEach(keyDown => {
                if(this.post.avaliacao.downs[keyDown] == this.usuarioDatabase['.key']){
                    //encontrou a key, remova o Down da database
                    this.database.ref(this.pathParaOPost+'/avaliacao/downs/'+keyDown).remove()
                }
            })
        }
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
                    <i class="fa fa-user-circle foto-perfil-usuario" aria-hidden="true"></i>
                </div>
                <st-informacoes-post :post="post"></st-informacoes-post>
                <st-dropdown-opcoes-post v-if="usuarioDatabase['.key'] == post.usuarioGerador.chave"></st-dropdown-opcoes-post>
            </div>

        </div>
        <div class="panel-body">
            <div class="row">
                <div class="up-down">
                    <span @click="upar()" class="up-down-link">
                        ({{numeroDeUps}})UP! <i data-v-451fdba8="" aria-hidden="true" class="fa fa-level-up"></i>
                    </span>
                    <span @click="downsar()" class="up-down-link">
                        ({{numeroDeDowns}})DOWN <i data-v-451fdba8="" aria-hidden="true" class="fa fa-level-down"></i>
                    </span>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 txt-area">
                    <h2>{{post.titulo}}</h2>
                    <div class="separator"></div>
                    <span>{{post.conteudo}}</span>
                </div>
            </div>

            <div class="row">
                <hr>
                <st-comentarios-panel :pathParaOPost="pathParaOPost"></st-comentarios-panel>
            </div>
        </div>
    </div>
</template>

<style scoped>
.up-down-link{
    cursor: pointer;
}
.up-down-link:hover{
    text-decoration: underline;
}
.up-down{
    font-family: claire;
    font-size: 20px;
}
.foto-perfil-usuario{
    font-size: 60px;
    color: #eacf9b;
}
.txt-area{
    background-color: rgba(115, 115, 115, .3);
    font-size:18px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.txt-area{
    padding:15px;
    border-radius: 5px;
}
.panel-post {
    position: relative;
    border-radius: 30px;
    border: 1px solid #eacf9b;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: transparent;
    color:#eacf9b!important;
    border-radius: 30px;
}
.panel-post > .panel-body{
    padding-bottom: 10;
}
</style>
