<script>
    export default {
        data(){
            return {
                grupos: '',
                busca: ''
            }
        },
        firebase: {

        },
        computed: {
            retornaUsuarioDatabase(){
                return this.$store.state.usuarioDatabase
            },
            listaFiltrada(){
              let padrao = new RegExp(this.busca, 'i')
              if(!this.busca){
                return this.grupos
              }

              let filtrado = this.grupos.filter((grupo) => {
                return padrao.test(grupo.nome)
              })
              console.log(filtrado)
              return filtrado
            }
        },
        methods: {
          buscarGrupo(){

          }
        },
        created(){
            this.$bindAsArray('grupos', this.$store.state.database.ref('/grupo/'))
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
            <div class="panel panel-grupos">
              <div class="panel-heading">
                Solicite a Inscrição de Grupo
              </div>
              <table class="table table-grupos text-center">
                  <thead>
                      <tr>
                          <th class="text-center">Grupo</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="grupo in listaFiltrada">
                          <td>{{grupo.nome}}</td>
                      </tr>
                  </tbody>

              </table>
              <div class="panel-footer">
                <div class="row">
                  <div class="col-xs-4 pull-right">
                    <input v-model="busca" class="form-control" type="text" placeholder="Busque um grupo...">
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
        <div v-if="this.$store.state.usuarioDatabase.tipo == escotista">
          <p>ESCOTISTAA</p>
        </div>
    </div>

</template>


<style>
    h1.carregando{
        color:#B9C159;
        font-family: claire, Helvetica, sans-serif;
        font-size: 90px;
    }
    table.table-grupos, .panel-grupos > .panel-body{
        color:#eacf9b;
        background-color:#56402E;

    }
    table.table-grupos{
      font-family: claire, Helvetica, sans-serif;
    }
    table.table-grupos > thead > tr > th{
      font-size: 28px;
    }
    table.table-grupos > tbody{
      font-size: 24px;
    }
    table.table-grupos > tbody > tr:hover{
      background-color:rgba(234,207,155,.92);
      color:#56402E;
      cursor: pointer;
    }

    .panel-grupos{
      background-color: transparent;
    }
    .panel-grupos > .panel-heading{
      background-color:rgba(234,207,155,.92);
      color:#56402E;
    }
    .panel-grupos > .panel-footer{
      background-color:transparent;
    }
</style>
