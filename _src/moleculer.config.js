const { v4: uuidv4 } = require('uuid')

const { name, version } = require('./package.json')
const { nats } = require('./application.config')
console.log(nats.port)
module.exports = {
  nodeID: `node-${name}-${version}-${uuidv4()}`,
  transporter: {
    type: 'NATS',
    options: {
      url: `nats://${nats.hostname}:${nats.port}`
    }
  },
  logger: true,
  metrics: false
}
