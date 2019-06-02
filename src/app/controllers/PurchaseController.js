const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    // traz informacoes do autor tambem
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)
    const purchase = await Purchase.create({
      content,
      ad,
      user: user._id
    })

    // cria job para envio do email
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save() // salva o job no redis

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
