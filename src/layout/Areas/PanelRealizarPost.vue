<script>
import {mapGetters} from 'vuex'
import {EventBus} from '../../eventBus'
import leitorIMG from '../../funcoesGlobais/DOM/LeitorIMG'
import ConversorBase64File from '../../funcoesGlobais/IMG/ConvertBase64ToFile'

var vm = {
    props: ['pathParaArea'],
    data(){
        return {
            conteudo: '',
            titulo: '',
            srcs: []
        }
    },
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', firebase: 'getFirebase', database: 'getDatabase', storage: 'getStorage'})
    },
    methods: {
        publicar(){
            let self = this

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
                //Limpando campos
                this.titulo = ''
                this.conteudo = ''
                //Enviando Imagens
                self.srcs.forEach(src => {
                    result.ref.child('imgs').push({chave: true})
                    .then(snap => {
                        snap.ref.set({chave: snap.key})
                        let file = ConversorBase64File(src, snap.key)
                        self.storage.ref('post').child(result.key).child(snap.key).put(file)
                    })

                })
                
            }).then(() => {
                self.srcs = []
            })
            .catch(erro => {
                console.log('Erro ao realizao o post: ', erro)
            })
            console.log(post)
        },
        adicionarFotos(){
            let input = leitorIMG.buildLeitorFoto(this.onFotoAdicionada)
            input.multiple = true
            input.click()
        },
        onFotoAdicionada(mudanca){
            let arquivos = mudanca.target.files,
                base64Arquivos = []           
            console.log('arquivos', arquivos)
            Array.from(arquivos).forEach(arquivo => {
                let reader = new FileReader()
                reader.onloadend = event => {
                    this.srcs.push(event.target.result)
                }
                reader.readAsDataURL(arquivo)
                

            })
        },
        removerImagem(index){
            this.srcs.splice(index, 1)
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
            <div class="panel panel-info panel-fotos">
                <div class="panel-heading">
                    <i data-v-4210859e="" aria-hidden="true" class="fa fa-picture-o"></i>
                    Fotos
                </div>
                <div class="panel-body">
                    <div class="col-xs-6 col-sm-2 col-lg-1 wrap-img-post" v-for="(src, index) in srcs" :key="src">
                        <img class="imgASerAdicionada" :src="src" alt="Imagem a ser adicionada">
                        <button @click="removerImagem(index)" class="btn btn-danger btn-rem">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>                   
        </div>
        <div class="panel-footer panel-footer-realizar">
            <div class="btn-toolbar pull-right">
                <button @click="adicionarFotos()" class="btn btn-primary"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
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
.imgASerAdicionada{
    width: 100px;
    height: 100px;
    display: inline;
}
.wrap-img-post{
    margin-right: 30px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-rem{
    position: absolute;
    bottom: -10px;
    right: -10px;
    border-radius: 500px;
    z-index: 30;
    outline: none!important;
}
</style>