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
    transporter.sendMail(email).then(() =>
        console.log("SPAMOU")
    ).catch(erro => console.err(erro))
}
