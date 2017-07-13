import Vue from 'vue'
import VueX from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(VueX)

export default new VueX.Store({
    state,
    mutations,
    getters: {
        getUsuario(state){
            return state.usuario
        },
        getDatabase(state){
            return state.database
        },
        getFirebase(state){
            return state.firebase
        },
        getAuth(state){
            return state.auth
        },
        getUsuarioDatabase(state){
            return state.usuarioDatabase
        }
    }
})