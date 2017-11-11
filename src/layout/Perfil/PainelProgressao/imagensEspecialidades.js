const urlINI = '/src/assets/icones_progressao/',
      pathDbBase = '/escopoProgressao/especialidades/'

let arr_urls = [
    {
      url: 'esporte.png',
      nome: 'Desportos',
      db: 'desportos'
    },
    {
      url: 'globo.png',
      nome: 'Ciência e Tecnologia',
      db: 'ciencia e tecnologia'
    },
    {
      url: 'cultura.png',
      nome: 'Cultura',
      db: 'cultura'
    },
    {
      url: 'corda.png',
      nome: 'Habilidades Escoteiras',
      db: 'habilidades escoteiras'
    },
    {
      url: 'servicos.png',
      nome: 'Serviços',
      db: 'serviços'
    }
  ]

for(let i = 0; i < arr_urls.length; i++){
    arr_urls[i].url = urlINI + arr_urls[i].url
    arr_urls[i].dbPATH = pathDbBase + arr_urls[i].db
    arr_urls[i].tipo = 'especialidade'
}
export default arr_urls