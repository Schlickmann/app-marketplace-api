const Ad = require('../models/Ad')

class AdController {
  // exibe todos
  async index (req, res) {
    const filters = {
      purchasedBy: null
    }
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      // verifica se a palavra enviada pelo usuário se encontra no titulo
      // parametro 'i' faz com que a busca nao seja case sensitive
      filters.title = new RegExp(req.query.title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      // traz informacoes do autor (tipo Join)
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  // exibe um
  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  // adiciona
  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  // atualiza
  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  // deleta
  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
