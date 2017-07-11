import PagInicial from './Paginas/PagInicial.vue'
import PagCadastro from './Paginas/PagCadastro.vue'
import PagPerfil from './Paginas/PagPerfil.vue'

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
    }
]