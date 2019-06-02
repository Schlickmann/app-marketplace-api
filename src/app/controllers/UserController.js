const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    // verifica se ja existe usuário com determinado email
    if (await User.findOne({ email })) {
      return res.status(400).json({
        error: 'User already exists.'
      })
    }

    // cria novo usuario
    const user = await User.create(req.body)

    // Retorna usuario criado
    return res.json(user)
  }
}

module.exports = new UserController()
