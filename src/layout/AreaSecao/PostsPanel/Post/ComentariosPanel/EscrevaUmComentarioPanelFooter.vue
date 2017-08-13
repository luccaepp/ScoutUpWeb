<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['pathParaOPost'],
    data(){
        return {
            txtComentario: ''
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase', firebase: 'getFirebase'})
    },
    methods: {
        enviarComentario(){
            this.database.ref(this.pathParaOPost+'/comentarios/').push({
                usuarioGerador: {
                    chave: this.usuarioDatabase['.key'],
                    nome: this.usuarioDatabase.nome,
                    tipo: this.usuarioDatabase.tipo
                },
                conteudo: this.txtComentario,
                timeStamp: this.firebase.database.ServerValue.TIMESTAMP
            })
        }
    }
}
export default vm
</script>
<template>
    <div class="panel-footer">
        <div class="row">
            <div class="col-xs-10">
                <div class="form-group">
                    <input @keyup.enter="enviarComentario()" v-model="txtComentario" 
                        class="form-control col-xs-10" type="text" placeholder="Escreva um Comentário...">
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group">
                    <input @click="enviarComentario()" class="btn btn-success btn-comentario" type="button" value="Enviar">
                </div>
            </div>
        </div>

    </div>
</template>
<style>
.btn-comentario{
    margin-left: -20px;
}
</style>