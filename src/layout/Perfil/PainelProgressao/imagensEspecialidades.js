const urlINI = '/src/assets/icones_progressao/'

let arr_urls = [
    {
      url: 'esporte.png',
      nome: 'Esporte'
    },
    {
      url: 'globo.png',
      nome: 'Ciência \ne\n Tecnologia'
    },
    {
      url: 'cultura.png',
      nome: 'Cultura'
    },
    {
      url: 'corda.png',
      nome: 'Habilidades Escoteiras'
    },
    {
      url: 'servicos.png',
      nome: 'Serviços'
    }
  ]

for(let i = 0; i < arr_urls.length; i++)
    arr_urls[i].url = urlINI + arr_urls[i].url

export default arr_urls