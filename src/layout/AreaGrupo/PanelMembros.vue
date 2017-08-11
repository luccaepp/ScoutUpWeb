<script>
var vm = {
    props: ['grupo'],
    firebase(){
        return {

        }
    },
    computed: {
        exibirMembros(){
            if(this.grupo && this.membros){
                return true
            } else{
                console.log('Panel Membros - watch do grupo', this.grupo)
                if(this.grupo && this.grupo['.key']){
                    this.$bindAsArray('membros', this.$store.state.database
                                                    .ref('/usuario/')
                                                    .orderByChild( "grupo")
                                                    .equalTo(this.grupo['.key']))
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
            Membros
        </div>
        <div class="panel-body">
            <ul v-if="exibirMembros" class="list-group">
                <li v-for="membro in membros" class="list-group-item list-group-item-warning">
                    <i class="fa fa-user-circle" aria-hidden="true"></i> 
                    {{membro.nome}}
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