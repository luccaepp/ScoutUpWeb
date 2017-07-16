<script>
    export default {
        data(){
            return {
                grupos: ''
            }
        },
        firebase: {
            
        },
        computed: {
            retornaUsuarioDatabase(){
                return this.$store.state.usuarioDatabase
            }
        },
        created(){
            this.$bindAsArray('grupos', this.$store.state.database.ref('/grupo/').limitToFirst(20))
        }
    }
</script>


<template>
    <div class="container container-main">
        <div class="row" v-if="!retornaUsuarioDatabase">
            <div class="col-xs-12">
                <h1 class="carregando text-center">CARREGANDO...</h1>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-xs-12">
            <table class="table table-grupos text-center">
                <thead>
                    <tr>
                        <th class="text-center">Grupo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="grupo in grupos">
                        <td>{{grupo.nome}}</td>
                    </tr>
                </tbody>

            </table>
            </div>
        </div>
    </div>
</template>


<style>
    h1.carregando{
        color:#B9C159;
        font-family: claire, Helvetica, sans-serif;
        font-size: 90px;
    }
    table.table-grupos{
        color:#B9C159;
        background-color:#47723E; 
    }
</style>