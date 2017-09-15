exports.Email = function Email(de, para, assunto, html, attachments){
  this.from = de
  this.to = para
  this.subject = assunto
  this.html = html
  this.attachments = attachments
}
