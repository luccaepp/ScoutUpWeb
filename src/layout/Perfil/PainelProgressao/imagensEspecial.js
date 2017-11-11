const urlINI = '/src/assets/icones_progressao/',
      pathDbBase = '/escopoProgressao/atividadesSenior/Insignias/'

let arr_urls = [
    {
      url: 'imma.png',
      nome: 'IMMA',
      db: 'imma'
    },
    {
      url: 'desafio.png',
      nome: 'Desafio Comunitário',
      db: 'desafio comunitario'
    },
    {
      url: 'conesulazul.png',
      nome: 'Cone Sul',
      db: 'cone sul'
    },
    {
      url: 'luso.png',
      nome: 'Lusofonia',
      db: 'lusufonia'
    },
    {
      url: 'aprender.png',
      nome: 'Aprender',
      db: 'aprender'
    }
  ]

for(let i = 0; i < arr_urls.length; i++){
    arr_urls[i].url = urlINI + arr_urls[i].url
    arr_urls[i].dbPATH = pathDbBase + arr_urls[i].db
    arr_urls[i].tipo = 'interesse_especial'
}
export default arr_urls