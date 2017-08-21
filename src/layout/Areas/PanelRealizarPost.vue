<script>
import {mapGetters} from 'vuex'
import {EventBus} from '../../eventBus'
var vm = {
    props: ['pathParaArea'],
    data(){
        return {
            conteudo: '',
            titulo: ''
        }
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', firebase: 'getFirebase', database: 'getDatabase'})
    },
    methods: {
        publicar(){
            if(!this.conteudo || !this.titulo){
                bootbox.alert('Preencha todos os campos do Post')
                return
            } else if(this.titulo.length > 40){
                bootbox.alert('O tamanho máximo do título é de 40 caracteres')
                return
            }
            var post = {
                titulo: this.titulo,
                conteudo: this.conteudo,
                timeStamp: this.firebase.database.ServerValue.TIMESTAMP,
                usuarioGerador: {
                    nome: this.usuarioDatabase.nome,
                    chave: this.usuarioDatabase['.key'],
                    tipo: this.usuarioDatabase.tipo
                },
                avaliacao: {
                    ups: 0,
                    downs: 0
                }
            }
            //Cadastrando o Post na base de dados
            this.database.ref(this.pathParaArea+'/posts/').push(post).then(result => {
                this.titulo = ''
                this.conteudo = ''
            }).catch(erro => {
                console.log('Erro ao realizao o post: ', erro)
            })
            console.log(post)
        }
    }
}

export default vm
</script>
<template>
    <!-- PANEL REALIZAR POST -->
    <div class="panel panel-warning">
        <div class="panel-heading">
            <i class="fa fa-align-left" aria-hidden="true"></i> <span>Faça um Post</span>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <label for="tituloNovoPost" id="labelTituloNovoPost">Título</label>
                <input v-model="titulo" class="form-control" type="text" id="tituloNovoPost" placeholder="Ex: Olá Colegas de Seção!">
            </div>
            <div class="form-group">
                <label for="txtPost" id="labelTxtPost">Conteúdo</label>
                <textarea placeholder="Ex: Olá, tudo bem com vocês?" v-model="conteudo" id="txtPost" class="form-control" cols="30" rows="5"></textarea>
            </div>                       
        </div>
        <div class="panel-footer panel-footer-realizar">
            <div class="btn-toolbar pull-right">
                <button class="btn btn-primary"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
                <button class="btn btn-info"><i class="fa fa-paperclip" aria-hidden="true"></i></button>
                <input class="btn btn-success" type="button" value="Publicar" @click="publicar()">
                
            </div>
        </div>
    </div>
</template>

<style scoped>
textarea#txtPost{
    resize: vertical;
    max-height: 200px;
}
.panel-footer-realizar{
    height: 50px;
}
label#labelTituloNovoPost, label#labelTxtPost{
    font-size: 30px;
    color: #B9C159;
}
</style>