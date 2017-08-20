<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['area', 'tipoArea', 'ehEscotistaDaArea'],
    firebase(){
        return {

        }
    },
    computed: {
        ...mapGetters({database: 'getDatabase'}),
        exibirMembros(){
            if(this.area && this.membros){
                return true
            } else{
                console.log('Panel Membros - computed da área', this.area)
                //Caso a área exista e seja válida
                if(this.area && this.area['.key']){
                    //Caso a área seja do tipo grupo
                    if(this.tipoArea == 'grupo'){
                        this.$bindAsArray('membros', this.database
                                .ref('/usuario/')
                                .orderByChild(this.tipoArea)
                                .equalTo(this.area['.key']))
                    //Caso a área seja do tipo seção
                    } else if(this.tipoArea == 'secao' || this.tipoArea == 'patrulha'){
                        this.$bindAsArray('membros', this.database
                                    .ref('/usuario/')
                                    .orderByChild(this.tipoArea+'/chave')
                                    .equalTo(this.area['.key']))
                    }
                }
                return false
            }
        }
    }
}
export default vm
</script>

<template>
    <div class="panel panel-warning">
        <div class="panel-heading">
            <i data-v-e3b292f8="" aria-hidden="true" class="fa fa-user-circle"></i> Membros
        </div>
        <div class="panel-body">
            <ul v-if="exibirMembros" class="list-group">
                <li v-for="membro in membros" class="list-group-item list-group-item-warning">
                    <i class="fa fa-user-circle" aria-hidden="true"></i> 
                    {{membro.nome}}
                </li>
                <li v-if="ehEscotistaDaArea && tipoArea=='patrulha'" class="list-group-item list-group-item-warning">
                    <i class="fa fa-plus text-success" aria-hidden="true"></i>
                    <span id="addMembrosPatrulha">Adicionar Membros</span>
                </li>
            </ul>
            
        </div>
    </div>
</template>

<style scoped>
.fa-user-circle{
    font-size: 18px;
}
</style>
<style>
#addMembrosPatrulha{
    cursor: pointer;
}
#addMembrosPatrulha:hover{
    text-decoration: underline;
}
</style>