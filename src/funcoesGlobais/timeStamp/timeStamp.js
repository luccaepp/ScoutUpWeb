export default {
    retornaTimeStampFormatado(timeStamp){
        var data = new Date(timeStamp)
        return ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() + ' ' +
        ('0' + data.getHours()).slice(-2) + ':' + ('0' + data.getMinutes()).slice(-2)
    }
}