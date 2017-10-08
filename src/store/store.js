import Vue from 'vue'
import VueX from 'vuex'
import state from './state'
import mutations from './mutations'
import VueXFire from 'vuexfire'
import {EventBus} from '../eventBus'
import {firebaseAction} from 'vuexfire'

Vue.use(VueX)

const store = new VueX.Store({
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
        getStorage(state){
            return state.storage
        },
        getUsuarioDatabase(state){
            return state.usuarioDatabase
        },
        getFirestore(state){
            return state.firestore
        }
    },
    actions: {
        setUsuarioDatabaseRef: firebaseAction(
            ({bindFirebaseRef}, ref) => {
                bindFirebaseRef('usuarioDatabase', ref)
            }),
        
    }
})
EventBus.$on('usuarioConectado', (usuario) => {
    store.dispatch('setUsuarioDatabaseRef', state.database.ref('usuario/'+usuario.uid))
})
export default store