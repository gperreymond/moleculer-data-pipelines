const { v4: uuidv4 } = require('uuid')

const { name, version } = require('./package.json')
const { rabbitmq } = require('./application.config')

module.exports = {
  nodeID: `node-${name}-${version}-${uuidv4()}`,
  transporter: {
    type: 'AMQP',
    options: {
      url: `amqp://${rabbitmq.username}:${rabbitmq.password}@${rabbitmq.hostname}:${rabbitmq.port}`,
      eventTimeToLive: 5000,
      prefetch: 1,
      autoDeleteQueues: true
    }
  },
  logger: true,
  metrics: false
}
