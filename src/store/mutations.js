import { firebaseMutations } from 'vuexfire'
export default {
    'MUDAR_USUARIO'(state, payload){
        console.log('mudando usuario')
        state.usuario = payload
    },
    'MUDAR_USUARIO_DATABASE'(state, payload){
        console.log('mudando usuario database')
        console.log(payload)
        state.usuarioDatabase = payload
    },
    ...firebaseMutations
}
