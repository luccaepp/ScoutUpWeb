import PagInicial from './Paginas/PagInicial.vue'
import PagCadastro from './Paginas/PagCadastro.vue'
import PagPerfil from './Paginas/PagPerfil.vue'
import PagCadastroNaArea from './Paginas/PagCadastroNaArea.vue'
import PagCadastrarGrupo from './Paginas/PagCadastrarGrupo.vue'
import PagAreaGrupo from './Paginas/PagAreaGrupo.vue'
import PagAreaSecao from './Paginas/PagAreaSecao.vue'
import PagAreaPatrulha from './Paginas/PagAreaPatrulha.vue'

export default [
    {
        path: "/",
        component: PagInicial
    },
    {
        path: "/cadastro",
        component: PagCadastro
    },
    {
        path: "/perfil",
        component: PagPerfil
    },
    {
        path: "/cadastroNaArea",
        component: PagCadastroNaArea
    },
    {
      path: "/cadastrarGrupo",
      component: PagCadastrarGrupo
    },
    {
        path: "/grupos/:id",
        component: PagAreaGrupo
    },
    {
        path: "/grupos/:idGrupo/secoes/:idSecao",
        component: PagAreaSecao
    },
    {
        path: "/grupos/:idGrupo/secoes/:idSecao/patrulhas/:idPatrulha",
        component: PagAreaPatrulha
    }
]
