const path = require('path')
const YAML = require('yamljs')
const { v4: uuidv4 } = require('uuid')

const Pipelines = require('./framework/Pipelines')

const { name, version } = require('./package.json')
const { pipeline: filepath, nats } = require('./application.config')

module.exports = {
  nodeID: `node-${name}-${version}-${uuidv4()}`,
  transporter: {
    type: 'NATS',
    options: {
      url: `nats://${nats.hostname}:${nats.port}`,
      user: nats.username,
      pass: nats.password
    }
  },
  logger: true,
  metrics: false,
  created: async function (broker) {
    // Get config content
    const config = YAML.load(path.resolve(filepath))
    // Create pipelines services
    const pipelines = new Pipelines(config)
    const services = await pipelines.getAllServices()
    services.map(service => {
      broker.createService(service)
      return true
    })
  }
}
