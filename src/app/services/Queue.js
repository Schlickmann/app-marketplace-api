const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

// cria uma fila com processos utilizando a key
// para esses metodos usa a funcao handle para controle
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

// faz com que o sentry tambem registre os erros ocorridos
Queue.on('error', Sentry.captureException)

module.exports = Queue
