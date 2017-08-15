<script>
/* ------- Patrick Stival Chaerke, 2017 ------- */
import StInformacoesPost from './Post/InformacoesPost.vue'
import StDropdownOpcoesPost from './Post/DropdownOpcoesPost.vue'
import StComentariosPanel from './Post/ComentariosPanel.vue'
import {mapGetters} from 'vuex'
var vm = {
    //Objetos herdados por props
    props: ['post', 'area', 'ehDessaArea', 'pathParaArea'],
    //componentes que são filhos do componente Post
    components: {
        StInformacoesPost,
        StDropdownOpcoesPost,
        StComentariosPanel
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        //Retorna o path no firebase para o Post
        pathParaOPost(){
            console.log('path para o post', this.post)
            return this.pathParaArea+'/posts/'+this.post['.key']
        },
        postUpado(){
            //O número de ups do post é diferente de 0?
            return this.numeroDeUps != 0 
                    //A key do usuário existe dentre os ups? (se ela não estiver nos ups, o indexOf() retorna -1)
                    ? Object.values(this.post.avaliacao.ups).indexOf(this.usuarioDatabase['.key']) != -1 
                        //O usuário deu Up nesse post
                        ? true 
                        //O usuário não deu Up nesse post
                        : false
                    : false
        },
        postDownsado(){
            //O número de downs do post é diferente de 0?
            return this.numeroDeDowns != 0 
                    //A key do usuário existe dentre os downs? (se ela não estiver nos downs, o indexOf() retorna -1)
                    ? Object.values(this.post.avaliacao.downs).indexOf(this.usuarioDatabase['.key']) != -1 
                        //O usuário deu Down nesse post
                        ? true 
                        //O usuário não deu Down nesse post
                        : false
                    : false
        },
        numeroDeUps(){
            //Existe o objeto avaliação dentro do Post? (o firebase apaga automaticamente esse objeto se não tiver ups nem downs)
            return this.post.avaliacao 
                    //A avaliação do post tem um array chamado ups?
                    ? this.post.avaliacao.ups 
                        //retorne o tamanho do array ups
                        ? Object.keys(this.post.avaliacao.ups).length 
                        //O número de ups no post é igual a 0
                        : 0 
                    //O número de Ups no Post é igual a 0
                    : 0
        },
        numeroDeDowns(){
            //Existe o objeto avaliação dentro do Post? (o firebase apaga automaticamente esse objeto se não tiver ups nem downs)
            return this.post.avaliacao 
                    //A avaliação do post tem um array chamado downs?
                    ? this.post.avaliacao.downs 
                        //retorne o tamanho do array downs
                        ? Object.keys(this.post.avaliacao.downs).length 
                        //O número de Downs no Post é igual a 0                        
                        : 0 
                    //O número de Downs no Post é igual a 0
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
                <!-- Foto de Perfil do Usuário que realizou o Post -->
                <div class="col-sm-1 col-xs-4 col-md-1 col-lg-1">
                    <i class="fa fa-user-circle foto-perfil-usuario" aria-hidden="true"></i>
                </div>
                <!-- Os seguintes componentes só serão carregados se o usuário gerador do post tiver sido carregado
                (isso é útil porque quando a lista é atualizada no "Mostrar mais..." ou "Mostrar menos...", 
                o vue perde a referência do post e precisa recarregá-la) -->
                <template v-if="post.usuarioGerador">
                    <!-- Painel com as Informações do post (data, autor, etc) -->
                    <st-informacoes-post :post="post"></st-informacoes-post>
                    <!-- Dropdown que permite apagar ou editar o post. Ele só será mostrado se o
                    usuário logado for autor do post -->
                    <st-dropdown-opcoes-post :pathParaOPost="pathParaOPost" 
                        v-if="usuarioDatabase['.key'] == post.usuarioGerador.chave"></st-dropdown-opcoes-post>
                </template>
            </div>

        </div>
        <div class="panel-body">
            <div class="row">
                <div class="up-down">
                    <!-- Chame o método upar se o usuário clicar -->
                    <span @click="upar()" class="up-down-link">
                        ({{numeroDeUps}})UP! <i data-v-451fdba8="" aria-hidden="true" class="fa fa-level-up"></i>
                    </span>
                    <!-- Chame o método downsar se o usuário clicar -->
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
                <!-- O usuário só poderá comentar caso ele faça parte dessa área,
                     por isso é necessário que se passe a prop "ehDessaArea" -->
                <st-comentarios-panel :ehDessaArea="ehDessaArea" :pathParaOPost="pathParaOPost" :post="post"></st-comentarios-panel>
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
