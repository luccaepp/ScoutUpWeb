<script>
import {mapGetters} from 'vuex'
var vm = {
    props: ['tipoArea', 'usuario'],
    computed: {
        ...mapGetters({usuarioDatabase: 'getUsuarioDatabase', database: 'getDatabase'})
    },
    methods: {
      excluirUsuario(){
        bootbox.confirm("Você realmente deseja remover "+ this.usuario.nome + "?", querExcluir => {
        if(!querExcluir) return
          const userRef = this.database.ref(`usuario/${this.usuario['.key']}`)
          if(this.tipoArea === 'grupo')
            return userRef.child(this.tipoArea).remove()
            .then(() => userRef.child('secao').remove())
            .then(() => userRef.child('patrulha').remove())
          if(this.tipoArea === 'secao')
            return userRef.child(this.tipoArea).remove()
            .then(() => userRef.child('patrulha').remove())
          return userRef.child(this.tipoArea).remove()
        })
    }    
    }
}
export default vm
</script>
<template>
    <!-- DROPDOWN DAS OPÇÕES DO POST -->
    <div class="dropdown pull-right col-xs-1 col-lg-1">
        <span class="dropdown-toggle pull-right" type="button" data-toggle="dropdown">
          <i  class="fa fa-caret-down dropdown-toggle"></i>
        </span>
    <ul class="dropdown-menu dropdown-menu-right menu-opt-post pull-right" role="menu">
        <li @click="excluirUsuario()" role="presentation">
            <span class="item-dropdown" role="menuitem">
                <i class="fa fa-times" aria-hidden="true"></i> Remover
            </span>
        </li>
    </ul>
    </div>
</template>

<style scoped>
li{
    cursor: pointer;
}
li:hover{
    text-decoration: underline;
    background-color: #846246;
}
</style>

<style>
.dropdown{
  position: relative;
}
.menu-opt-post{
    margin-top: 10px;
    padding: 5px;
}

.dropdown-menu{
    border: 1px solid #eacf9b;
}
.divider{
    background-color: #eacf9b!important;
}
</style>
