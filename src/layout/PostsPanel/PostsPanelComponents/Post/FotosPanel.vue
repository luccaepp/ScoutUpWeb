<script>
import { mapGetters } from 'vuex'

export default {
    props: ['post', 'pathParaOPost'],
    firebase(){
        return {
            imgs: this.database.ref(this.pathParaOPost + '/imgs')
        }
    },
    data(){
        return {
            srcs: []
        }
    },
    computed: {
        ...mapGetters({storage: 'getStorage', database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        ehAutor(){
            if(this.usuarioDatabase['.key'] == this.post.usuarioGerador.chave) return true
            return false
        }
    },
    created(){
        console.log('created', this.pathParaOPost)
        let self = this
        if(!this.imgs) return
        this.imgs.forEach(img => {
            this.storage.ref('post').child(this.post['.key']).child(img['.key']).getDownloadURL().then(url => {
                self.srcs.push(url)
            }).catch(err => {})
        })

    }
}
</script>

<template>
  <div class="panel panel-info">
      <div class="panel-heading">
          Fotos
      </div>
      <div class="panel-body">
        <div class="col-xs-6 col-sm-2 col-lg-2 wrap-img-post" v-for="(src, index) in srcs" :key="src">
            <img class="imgPost" :src="src" alt="Imagem a ser adicionada">
            <button v-if="ehAutor" @click="removerImagem(index)" class="btn btn-danger btn-rem">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
      </div>
  </div>
</template>

<style scoped>
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

