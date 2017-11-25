<script>
import StPost from './PostsPanelComponents/Post.vue'
import StPostDeAtividade from './PostsPanelComponents/PostDeAtividade.vue'
import {mapGetters} from 'vuex'
import {EventBus} from '../../eventBus'
import _ from 'lodash' 
var vm = {
    props: ['area', 'ehDessaArea', 'pathParaArea'],
    data(){
        return {
            limitAtual: 15,
            posts: []
        }
    },
    firebase(){
        return {  }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        refPosts(){
            return this.database.ref(this.pathParaArea+'/posts').orderByChild('timeStampNeg')
                                                    .limitToLast(this.limitAtual)
        }
    },
    watch: {
        limitAtual(){
            this.$bindAsObject('posts', this.refPosts)
        },
        refPosts(){
            this.$unbind('posts')
            this.$bindAsArray('posts', this.refPosts)
        }
    },
    components: {
        StPost,
        StPostDeAtividade
    },
    created(){
        this.$bindAsArray('posts', this.refPosts)
    }
}
export default vm
</script>
<template>
    <div>
        <h2>Posts</h2>
        <template v-for="post in posts">
            <st-post v-if="post.tipo == 'comum'" 
                    :ehDessaArea="ehDessaArea" 
                    :post="post" 
                    :area="area" 
                    :pathParaArea="pathParaArea" 
                    :key="post['.key']">
            </st-post>

            <st-post-de-atividade v-else-if="post.tipo == 'atividade'"                     
                    :ehDessaArea="ehDessaArea"
                    :post="post"
                    :pathParaArea="pathParaArea"
                    :key="post['.key']">
            </st-post-de-atividade>
        </template>
        <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
            <span @click="limitAtual = 15" v-if="limitAtual > 15" class="pull-left mostrares">
                Mostrar Menos...
            </span>
            <span @click="limitAtual += 5" v-if="posts.length >= 15" class="pull-right mostrares">
                Mostrar Mais...
            </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mostrares{
    font-family: claire;
    font-size: 18px;
    cursor:pointer;
}
.mostrares:hover{
    text-decoration: underline;
}
h2{
    text-align: center;
    font-family: claire;
    text-transform: uppercase;
    font-size:50px;
}
</style>

<style>
.panel-post {
    position: relative;
    border-radius: 30px;
    border: 1px solid #eacf9b;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: transparent;
    color:#eacf9b!important;
    border-radius: 30px;
    text-overflow: clip;
}
.panel-post > .panel-body{
    padding-bottom: 10;
}
</style>
