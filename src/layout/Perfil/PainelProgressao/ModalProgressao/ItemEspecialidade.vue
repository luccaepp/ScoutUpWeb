<script>
import { mapGetters } from 'vuex'

export default {
    props: ['item', 'especialidade'],
    firebase(){
        return {

        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
        subitensREF(){
            return this.database.ref('escopoProgressao')
                                .child('especialidades')
                                .child(this.especialidade.toLowerCase())
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
        console.log('usu', this.usuarioDatabase['.key'])
        this.$bindAsArray('especialidadesDoItem', this.database.ref('progressaoUsuario')
                                                            .child(this.usuarioDatabase['.key'])
                                                            .child(this.especialidade.toLowerCase())
                                                            .child('especialidades')
                                            )
        
    },
    methods: {
        temConquista(subitem){
            console.log('temConquista', this.especialidadesDoItem, subitem)
            return this.especialidadesDoItem 
                        ? this.especialidadesDoItem.length > 0
                            ? this.especialidadesDoItem.filter(e => e['.key'] == subitem['.key']).length > 0
                            : false
                        : false
        }
    }
}
</script>

<template>
  <div class="row">
      <div class="col-xs-12">
          <div class="item text-center">
            <h3>
              <i class="fa fa-trophy" aria-hidden="true"></i>
              {{item.nome}}
              <i class="fa fa-trophy" aria-hidden="true"></i>
            </h3>
            <div class="subitens">
                <div class="subitem" v-for="subitem in subitens">
                    <h4>
                        <i v-if="temConquista(subitem)" class="fa fa-star" aria-hidden="true"></i>
                        <i v-else class="fa fa-star-o" aria-hidden="true"></i>
                        {{subitem['.value']}}
                    </h4>
                </div>
            </div>
          </div>

      </div>
  </div>
</template>

<style scoped>
.item{
    background-color: rgba(86, 64, 46, 1);
    border: 1px solid;
    color: #EACF9B;
    border-color: #EACF9B;
    font-family: claire;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
}


</style>
