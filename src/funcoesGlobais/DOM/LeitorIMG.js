import criadores from './LeitorIMG/criadores'

let leitor = {
    inputs: new Map(),
    buildLeitorFoto(callback){
        return genericBuild(callback, criadores.criarInputIMG)
    }
}

function genericBuild(callback, criador){
    if(!leitor.inputs.get(callback)){
        leitor.inputs.set(callback, criador(callback))
    }
    return leitor.inputs.get(callback)
}

export default leitor