<script>
import { mapGetters } from 'vuex'
import StTitulo from './Titulo.vue'
import StSubItem from './Subitem.vue'

export default {
    props: ['item', 'especialidade', 'usuarioDaPag'],
    components: {
        StTitulo,
        StSubItem
    },
    firebase(){
        return {
            especialidadesDoItem: this.database.ref('progressaoUsuario')
                                                            .child(this.usuarioDaPag['.key'])
                                                            .child(this.especialidade)
                                                            .child('especialidades')
                                                            .child(this.item['.key'])
        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'}),
        subitensREF(){
            return this.database.ref('escopoProgressao')
                                .child('especialidades')
                                .child(this.especialidade)
                                .child(this.item['.key'])
                                .child('itens')
        }
    },
    watch: {
        item(){
            if(this.item)
                this.$bindAsArray('subitens', this.subitensREF)
            
        }
    },
    created(){
        if(this.item)
            this.$bindAsArray('subitens', this.subitensREF)        
    },
    methods: {
        temConquista(subitem){
            return this.especialidadesDoItem 
                        ? this.especialidadesDoItem.length > 0
                            ? this.especialidadesDoItem.filter(e => (+e['.key'] - 1) == subitem['.key'] && e['.value'] == true).length > 0
                            : false
                        : false
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-xs-12">
            <st-titulo :titulo="item.nome"></st-titulo>
        </div>
        <div class="col-xs-12">
        <div class="subitens">
            <st-sub-item v-for="subitem in subitens" :subitem="subitem" :temConquista="temConquista(subitem)"></st-sub-item>
        </div>
        </div>
    </div>
</template>

<style scoped>
.subitens{
    background-color: rgba(100, 100, 100, .2);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
</style>
