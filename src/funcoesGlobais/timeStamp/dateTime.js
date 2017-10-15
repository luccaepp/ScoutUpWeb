import TimeStampTools from './timeStamp'

export default {
    padraoInput(timeStamp){
        let date = new Date(timeStamp)

        let dateS = TimeStampTools.retornaTimeStampSoDateUSA(timeStamp).replace(/\//g, '-') + 'T' + date.toLocaleTimeString()

        return dateS
    }
}