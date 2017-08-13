export default {
    retornaTimeStampFormatado(timeStamp){
        var data = new Date(timeStamp)
        return ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() + ' ' +
        data.getHours() + ':' + data.getMinutes()
    }
}