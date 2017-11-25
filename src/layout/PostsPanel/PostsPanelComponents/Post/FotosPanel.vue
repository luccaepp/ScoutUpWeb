<script>
import { mapGetters } from 'vuex'
import leitorIMG from '../../../../funcoesGlobais/DOM/LeitorIMG'
import ConversorBase64File from '../../../../funcoesGlobais/IMG/ConvertBase64ToFile'

export default {
    props: ['post', 'pathParaOPost', 'temPermissao'],
    firebase(){
        return {

        }
    },
    data(){
        return {
            srcs: [],
            imgs: null
        }
    },
    computed: {
        ...mapGetters({storage: 'getStorage', database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        ehAutor(){
            if(this.usuarioDatabase['.key'] == this.post.usuarioGerador.chave) return true
            return false
        }
    },
    methods: {
        removerImagem(srcBundle){
            let imgRem = srcBundle.img
            this.database.ref(this.pathParaOPost + '/imgs/' + imgRem['.key']).remove()
        },
        addFoto(){
            let input = leitorIMG.buildLeitorFoto(this.onFotoAdicionada)
            input.multiple = true
            $(input).val('')
            input.click()
        },
        onFotoAdicionada(mudanca){
            console.log('onFotoAdicionada inicial')
            let arquivos = mudanca.target.files,
                base64Arquivos = []           
            console.log('arquivos', arquivos)
            let self = this
            //iterando os arquivos
            Array.from(arquivos).forEach(arquivo => {
                let reader = new FileReader()

                //callback 
                reader.onloadend = event => {
                    console.log('leu')
                    //pushando uma referencia de imagem
                    self.database.ref(`${self.pathParaOPost}/imgs`).push({chave: true}).then(snap => {
                        console.log('pushou', snap.key)
                        //criando uma file em base64
                        let file = ConversorBase64File(event.target.result, snap.key)
                        //enviando o base64 para o storage
                        self.storage.ref('post').child(self.post['.key']).child(snap.key).put(file).then(result => {
                            console.log('storageou')
                            snap.ref.set({chave: snap.key})
                            self.input = null
                        })
                    })
                }
                //lendo o arquivo selecionado pelo input
                reader.readAsDataURL(arquivo)
                

            })
        }
    },
    watch: {
        imgs(){
            let self = this

            this.srcs = []
            this.imgs.forEach(img => {
                if(img.chave != img['.key']) return
                this.storage.ref('post').child(this.post['.key']).child(img['.key']).getDownloadURL().then(url => {
                    self.srcs.push({url, img})
                }).catch(err => {})
            })
        }
    },
    created(){
        this.$bindAsArray('imgs', this.database.ref(this.pathParaOPost + '/imgs'))
    }
}
</script>

<template>
  <div class="panel panel-info">
      <div class="panel-heading">
          Fotos
      </div>
      <div class="panel-body">
        <div class="row">
            <template v-if="srcs.length > 0">
                <div class="col-xs-6 col-sm-2 col-lg-2 wrap-img-post" v-for="(src, index) in srcs" :key="src.url">
                    <img class="imgPost" :src="src.url" alt="Imagem a ser adicionada">
                    <button v-if="ehAutor" @click="removerImagem(src)" class="btn btn-danger btn-rem">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </template>
            <div class="row text-info" v-else-if="!temPermissao">
                <div class="col-xs-12">
                    <p class="sem-foto">Nenhuma foto para mostrar...</p>
                </div>
            </div>
            <div class="btn-toolbar" v-if="temPermissao">
                <button @click="addFoto" class="btn btn-success">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.btn-toolbar{
    padding-left: 15px;
    padding-right: 15px;
}
.sem-foto{
    padding: 10px;
}
.imgPost{
    width: 110px!important;
    height: 100px;
    display: inline;
}
.wrap-img-post{
    margin-right: 30px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-rem{
    position: absolute;
    bottom: -10px;
    right: 25px;
    border-radius: 500px;
    z-index: 30;
    outline: none!important;
}
@media(max-width: 768px){
    .btn-rem{
        right: 70px;
    }
}
</style>

