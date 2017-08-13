<script>
import StPost from './PostsPanel/Post.vue'
import {mapGetters} from 'vuex'
var vm = {
    props: ['secao'],
    firebase(){
        return {
            posts: this.database.ref('/grupo/'+this.usuarioDatabase.grupo+'/secoes/'+this.secao['.key']+'/posts')
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'})
    },
    components: {
        StPost
    }
}
export default vm
</script>
<template>
    <div>
        <template v-for="post in posts">
            <st-post :post="post" :secao="secao"></st-post>
        </template>
    </div>
</template>

<style>

</style>