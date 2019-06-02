const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')

// cria e configura o metodo de transporte do email
const transport = nodemailer.createTransport(mailConfig)

transport.use(
  'compile',
  hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transport
