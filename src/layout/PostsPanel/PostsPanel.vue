<script>
import StPost from './PostsPanelComponents/Post.vue'
import {mapGetters} from 'vuex'
import _ from 'lodash' 
var vm = {
    props: ['area', 'ehDessaArea', 'pathParaArea'],
    data(){
        return {
            limitAtual: 15
        }
    },
    firebase(){
        return {
            posts: {
                source: this.refPosts,
                asObject: false,
                readyCallback(){
                    
                }
            }
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        postsDesc(){
            return this.posts
        },
        refPosts(){
            return this.database.ref(this.pathParaArea+'/posts')
                                                    .limitToLast(this.limitAtual)
        }
    },
    watch: {
        limitAtual(){
            this.$bindAsObject('posts', this.refPosts)
        }
    },
    components: {
        StPost
    }
}
export default vm
</script>
<template>
    <div>
        <h2>Posts</h2>
        <template v-for="post in postsDesc">
            <st-post :ehDessaArea="ehDessaArea" :post="post" :area="area" :pathParaArea="pathParaArea"></st-post>
        </template>
        <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
            <span @click="limitAtual = 15" v-if="limitAtual > 15" class="pull-left mostrares">
                Mostrar Menos...
            </span>
            <span @click="limitAtual += 5" v-if="postsDesc.length >= 15" class="pull-right mostrares">
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