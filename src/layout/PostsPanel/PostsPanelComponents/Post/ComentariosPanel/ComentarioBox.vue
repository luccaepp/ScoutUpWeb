<script>
import FormatadorDeTimeStamp from '../../../../../funcoesGlobais/timeStamp/timeStamp'
import {mapGetters} from 'vuex'
var vm = {
    props: ['comentario', 'pathParaOPost'],
    methods: {
        retornaTimeStampFormatado(timeStamp){
            return FormatadorDeTimeStamp.retornaTimeStampFormatado(timeStamp)
        },
        upar(){
            //Caso o comentário já tenha sido upado, remova esse up
            if(this.comentarioUpado){
                this.removerUp()
                return
            }
            //Caso o post tenha sido downsado, remova o down e adicione um up
            if(this.comentarioDownsado){
                this.removerDown()
            }
            //Adicionando o Up
            this.adicionar('ups')
        },
        downsar(){
            //Caso o comentário já tenha sido downsado, remova esse down
            if(this.comentarioDownsado){
                this.removerDown()
                return
            }
            //Caso o comentário tenha sido upado, remova o up e adicione um down
            if(this.comentarioUpado){
                this.removerUp()
            }
            //Adicionando o Down
            this.adicionar('downs')
        },
        adicionar(upDown){
            console.log('adicionarUpDown', this.comentario)
            this.database.ref(this.pathParaOPost+'/comentarios/'+this.comentario['.key']+'/avaliacao/'+upDown).push(this.usuarioDatabase['.key'])
        },
        removerUp(){
            //Verificando qual a key do Up realizado
            Object.keys(this.comentario.avaliacao.ups).forEach(keyUp => {
                if(this.comentario.avaliacao.ups[keyUp] == this.usuarioDatabase['.key']){
                    //encontrou a key, remova o Up da database
                    this.database.ref(this.pathParaOPost+'/comentarios/'+this.comentario['.key']+'/avaliacao/ups/'+keyUp).remove()
                }
            })
        },
        removerDown(){
            //Verificando qual a key do Down realizado
            Object.keys(this.comentario.avaliacao.downs).forEach(keyDown => {
                if(this.comentario.avaliacao.downs[keyDown] == this.usuarioDatabase['.key']){
                    //encontrou a key, remova o Down da database
                    this.database.ref(this.pathParaOPost+'/comentarios/'+this.comentario['.key']+'/avaliacao/downs/'+keyDown).remove()
                }
            })
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        comentarioUpado(){
            return this.numeroDeUps != 0
                    ? Object.values(this.comentario.avaliacao.ups).indexOf(this.usuarioDatabase['.key']) != -1 
                        ? true
                        : false
                    : false
        },
        comentarioDownsado(){
            return this.numeroDeDowns != 0
                    ? Object.values(this.comentario.avaliacao.downs).indexOf(this.usuarioDatabase['.key']) != -1 
                        ? true
                        : false
                    : false
        },
        numeroDeUps(){
            return this.comentario.avaliacao 
                    ? this.comentario.avaliacao.ups 
                        ? Object.keys(this.comentario.avaliacao.ups).length
                        : 0 
                    : 0
        },
        numeroDeDowns(){
            var result = this.comentario.avaliacao 
                    ? this.comentario.avaliacao.downs 
                        ? Object.keys(this.comentario.avaliacao.downs).length
                        : 0 
                    : 0
            return result
        }
    }
}
export default vm
</script>
<template>
    <!-- Comentário BOX -->
    <div class="col-sm-11">
        <!-- Wrapper da Caixa do Comentário -->
        <div class="col-xs-9 col-sm-11 col-sm-offset-1">
            <!-- Foto de Perfil -->
            <div class="row">
                <i class="fa fa-user-circle foto-comment col-xs-2 col-sm-1" aria-hidden="true"></i>
                <!-- Painel Comentário  -->
                <div class="panel panel-comment col-xs-9 col-xs-offset-1 col-sm-offset-1">
                    <div class="panel-heading">
                        <strong>{{comentario.usuarioGerador.nome}}</strong> 
                        <span class="text-muted">{{retornaTimeStampFormatado(comentario.timeStamp)}}</span>
                        <div class="pull-right">
                        <span @click="upar()" class="up-down-link">({{numeroDeUps}}) Up! <i class="fa fa-level-up" aria-hidden="true"></i></span>
                        <br>
                        <span @click="downsar()" class="up-down-link">({{numeroDeDowns}}) Down <i class="fa fa-level-down" aria-hidden="true"></i></span>
                        </div>
                    </div>
                    <div class="panel-body">
                        {{comentario.conteudo}}
                    </div><!-- /panel-body -->
                </div><!-- /panel-comment -->
            </div>
        </div>
    </div>
</template>
<style scoped>
.text-muted{
    font-size: 12px;
}
.foto-comment{
    font-size: 60px;
    color: #eacf9b;
    padding: 0;
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

.panel-comment > .panel-heading .up-down-link{
    font-family: claire!important;
    color: #B9C159!important;
    font-size: 18px;
    cursor: pointer;
}
.panel-comment > .panel-heading .up-down-link:hover{
    text-decoration: underline;
}

.panel-comment > .panel-body{
    background-color: #B9C159;
}
</style>
