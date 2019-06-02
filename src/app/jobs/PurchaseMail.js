const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data
    await Mail.sendMail({
      from: '"Beatriz Ferraz" <bia.magnabosco@hotmail.com>',
      to: ad.author.email,
      subject: `Purchase Request ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    // finaliza o job
    return done()
  }
}

module.exports = new PurchaseMail()
