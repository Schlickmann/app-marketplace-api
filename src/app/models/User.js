const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// define que quer um HOC aconteca antes de salvar os dados
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  // transforma senha em hash
  this.password = await bcrypt.hash(this.password, 8)
})

// permite a criacao de métodos para uso por Users
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

// definindo metodos estaticos
UserSchema.statics = {
  // cria token para controle de sessao
  generateToken ({ id }) {
    // informacoes importantes a serem criptografadas dentro do token
    // palavra secreta
    // parametros importantes ex.: expiresIn
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
