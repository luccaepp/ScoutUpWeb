import PagInicial from './Paginas/PagInicial.vue'
import PagCadastro from './Paginas/PagCadastro.vue'
import PagPerfil from './Paginas/PagPerfil.vue'
import PagCadastroNaArea from './Paginas/PagCadastroNaArea.vue'

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
    }
]