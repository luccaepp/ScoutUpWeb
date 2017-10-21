<script>
import {mapGetters} from 'vuex'

export default {
  props: ['amigo'],
  data(){
      return {
          srcFoto: ''
      }
  },
  computed: {
      ...mapGetters({storage: 'getStorage'})
  },
  created(){
      this.storage.ref('/fotoPerfil/' + this.amigo.chave).getDownloadURL().then(url => this.srcFoto = url, erro => this.srcFoto = '')
  }
}
</script>

<template>
    <li class="list-group-item list-group-item-warning col-lg-3">
        <i v-if="!srcFoto" class="fa fa-user-circle fotoPerfilAmigo" aria-hidden="true"></i>
        <img v-else :src="srcFoto" alt="Foto de perfil do amigo" class="fotoPerfilAmigo img-circle">
        <h4 class="list-group-item-heading">
            <router-link class="text-warning" :to="'/usuarios/'+amigo.chave">{{amigo.nome}}</router-link>
        </h4>
    </li>
</template>

<style scoped>
i.fotoPerfilAmigo{
    font-size: 40px;
}
img.fotoPerfilAmigo{
    width: 40px;
    height: 40px;
}
</style>
