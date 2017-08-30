export default {
    retornaTimeStampFormatado(timeStamp){
        var data = new Date(timeStamp)
        return this.retornaTimeStampFormatadoSoDate(timeStamp)  + ' ' +
        ('0' + data.getHours()).slice(-2) + ':' + ('0' + data.getMinutes()).slice(-2)
    },
    retornaTimeStampFormatadoSoDate(timeStamp){
        var data = new Date(timeStamp)
        return ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear()
    },
    retornaTimeStampSoDateUSA(timeStamp){
        var br = this.retornaTimeStampFormatadoSoDate(timeStamp)
        console.log('br', br)
        return br.substring(6, 10) + '/' + br.substring(3, 5) + '/' + br.substring(0, 2)
    },
    strUSAParaBR(usa){
        return usa.substring(8, 10) + '/' + usa.substring(5, 7) + '/' + usa.substring(0, 4)
    }
}