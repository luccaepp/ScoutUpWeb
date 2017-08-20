<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['post', 'editando', 'pathParaOPost'],
    data(){
        return {
            txtTitulo: this.post.titulo,
            txtConteudo: this.post.conteudo
        }
    },
    methods: {
        salvarEdicao(){
            this.database.ref(this.pathParaOPost).update({
                titulo: this.txtTitulo,
                conteudo: this.txtConteudo
            }).then(snap => {
                this.resetCampos()
                this.$emit('pararEdicao')
            })
        },
        cancelar(){
            this.$emit('pararEdicao')
            this.resetCampos()
        },
        resetCampos(){
            this.txtTitulo = this.post.titulo
            this.txtConteudo = this.post.conteudo
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'})
    }
}
export default vm
</script>

<template>
    <div class="col-xs-12 txt-area">
        <template v-if="editando">
            <div class="form-group">
                <input v-model="txtTitulo" type="text" class="form-control">
            </div>
            <div class="form-group">
                <textarea v-model="txtConteudo" cols="30" rows="10" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <div class="btn-toolbar pull-right">
                    <button @click="cancelar()" class="btn btn-warning">Cancelar</button>
                    <button @click="salvarEdicao()" class="btn btn-info">Salvar</button>
                </div>
            </div>
        </template>
        <template v-else>
            <h2>{{post.titulo}}</h2>
            <div class="separator"></div>
            <span>{{post.conteudo}}</span>
        </template>
    </div>
</template>

<style>
    
</style>