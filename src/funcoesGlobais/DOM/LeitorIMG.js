export default {
    input: null,
    buildLeitor(comp){
        let storageRef = comp.storageRef
        if(!this.input){
            this.input = document.createElement('input')
            this.input.type = 'file';
            this.input.multiple = false
            this.input.accept = "image/*"

            let self = this
            this.input.addEventListener('change', mudanca => {
                let arquivo = mudanca.target.files[0]
                storageRef.put(arquivo).then(resultado => comp.atualizarFotoDePerfil())
            })
        }
        
        return this.input
    }
}