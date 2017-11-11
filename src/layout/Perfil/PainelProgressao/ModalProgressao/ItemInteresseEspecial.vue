<script>
import StSubItem from './Subitem.vue'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            itemProgressaoUsuario: ''
        }
    },
    firebase(){
        return { }
    },
    props: ['item', 'insignia'],
    components: {
        StSubItem
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        temConquista(){
            console.log(this.itemProgressaoUsuario.length)
            return this.item 
                    ? this.item['.key']
                        ? this.itemProgressaoUsuario.length > 0
                            ? this.itemProgressaoUsuario.filter(e => (e['.key'] - 1) == +this.item['.key'] && e['.value'] == true).length > 0
                            : false
                        : false
                    : false
        }
    },
    created(){
        this.$bindAsArray('itemProgressaoUsuario', this.database.ref('progressaoUsuario')
                                                .child(this.usuarioDatabase['.key'])
                                                .child('atividadesRamo')
                                                .child('insignias')
                                                .child(this.insignia.db)                                                                                              
                                                )
    }
}
</script>

<template>
    <div class="row">
        <div class="col-xs-12">
            <st-sub-item :subitem="item" :temConquista="temConquista"></st-sub-item>
        </div>
    </div>
</template>