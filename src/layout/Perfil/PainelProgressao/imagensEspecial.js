const urlINI = '/src/assets/icones_progressao/'

let arr_urls = [
    {
      url: 'imma.png',
      nome: 'IMMA'
    },
    {
      url: 'desafio.png',
      nome: 'Desafio Comunitário'
    },
    {
      url: 'conesulazul.png',
      nome: 'Cone Sul'
    },
    {
      url: 'luso.png',
      nome: 'Lusofonia'
    },
    {
      url: 'aprender.png',
      nome: 'Aprender'
    }
  ]

for(let i = 0; i < arr_urls.length; i++)
    arr_urls[i].url = urlINI + arr_urls[i].url

export default arr_urls