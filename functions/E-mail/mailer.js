const nodemailer = require('nodemailer')
const Email = require('./Email')

const transporter = nodemailer.createTransport( {
  service: 'gmail',
  auth: {
    user: 'projetoscoutup@gmail.com',
    pass: 'leonardoChim'
  }
})

exports.mensageiro = (email) => {
    console.log('booora mensageiro')
    transporter.sendMail(email).then(() =>
        console.log("SPAMOU")
    ).catch(erro => console.log(erro))
}
