function Criadores() {
    this.criarInputBase = callback => {
        let input = document.createElement('input')
        input.type = 'file';
        input.multiple = false
        input.addEventListener('change', mudanca => {
            callback(mudanca)

        })

        this.criando = false
        return input
    }
    this.criarInputIMG = callback=> {
        let input = this.criarInputBase(callback)
        input.accept = "image/*"
        return input
    }
}

export default new Criadores()