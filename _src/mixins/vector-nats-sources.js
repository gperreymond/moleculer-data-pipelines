const NATS = require('nats')
const { Rabbit } = require('rabbit-queue')
const Errors = require('moleculer').Errors

const { rabbitmq, nats } = require('../application.config')

module.exports = {
  name: 'vector-nats-source',
  created () {
    this.NATSConn = false
    this.AMQPConn = false
  },
  async started () {
    try {
      // RABBITMQ
      const rabbit = new Rabbit(`amqp://${rabbitmq.username}:${rabbitmq.password}@${rabbitmq.hostname}:${rabbitmq.port}`, {
        prefetch: 1,
        replyPattern: false
      })
      await rabbit.createQueue('SourcesDomain.MessageFromVectorReceived.Queue', { durable: true, autoDelete: false })
      rabbit.bindToExchange('SourcesDomain.MessageFromVectorReceived.Queue', 'amq.topic', 'SourcesDomain.MessageFromVectorReceived.Key')
      rabbit.subscribe('SourcesDomain.MessageFromVectorReceived.Queue', (message, ack) => {
        const data = JSON.parse(message.content.toString())
        console.log(data)
        ack(null, 'ok')
      })
      // NATS
      this.NATSConn = NATS.connect(nats.hostname, { json: true, port: nats.port, reconnect: true })
      this.NATSConn.on('connect', () => {
        this.NATSConn.subscribe('SinksDomain.MessageToMoleculer.Queue', async (message, reply) => {
          rabbit.publish('SourcesDomain.MessageFromVectorReceived.Queue', message)
        })
      })
    } catch (err) {
      this.logger.error(err)
      throw new Errors.MoleculerError('Unable to connect to NATS')
    }
  }
}
