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
            if(!this.txtComentario){
                bootbox.alert('Escoteiro, escreva um comentário!')
                return
            }
            this.database.ref(this.pathParaOPost+'/comentarios/').push({
                usuarioGerador: {
                    chave: this.usuarioDatabase['.key'],
                    nome: this.usuarioDatabase.nome,
                    tipo: this.usuarioDatabase.tipo
                },
                conteudo: this.txtComentario,
                timeStamp: this.firebase.database.ServerValue.TIMESTAMP
            }).then(result => {
                result.ref.update({chave: result.key})
                this.txtComentario = ''
            })
        }
    }
}
export default vm
</script>
<template>
    <div class="panel-footer">
        <div class="row">
            <div class="col-md-11 col-sm-10 col-xs-9">
                <div class="form-group">
                    <input @keyup.enter="enviarComentario()" v-model="txtComentario" 
                        class="form-control col-xs-10" type="text" placeholder="Escreva um Comentário...">
                </div>
            </div>
            <div class="col-md-1 col-sm-2 col-xs-3">
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