const Errors = require('moleculer').Errors
const NATS = require('nats')

const { nats } = require('./application.config')

// nc.on('connect', () => {
//   // emitted whenever there's an error. if you don't implement at least
//   // the error handler, your program will crash if an error is emitted.
//   nc.on('error', (err) => {
//     console.log(err)
//   })
//   // connect callback provides a reference to the connection as an argument
//   nc.on('connect', (nc) => {
//     console.log(`connect to ${nc.currentServer.url.host}`)
//   })
//   // emitted whenever the client disconnects from a server
//   nc.on('disconnect', () => {
//     console.log('disconnect')
//   })
//   // emitted whenever the client is attempting to reconnect
//   nc.on('reconnecting', () => {
//     console.log('reconnecting')
//   })
//   // emitted whenever the client reconnects
//   // reconnect callback provides a reference to the connection as an argument
//   nc.on('reconnect', (nc) => {
//     console.log(`reconnect to ${nc.currentServer.url.host}`)
//   })
//   // emitted when the connection is closed - once a connection is closed
//   // the client has to create a new connection.
//   nc.on('close', function () {
//     console.log('close')
//   })
//   nc.subscribe('vector_moleculer', (message, reply) => {
//     console.log(message)
//   })
// })

module.exports = {
  name: 'vector-nats-source',
  created () {
    this.NATSConn = false
  },
  async started () {
    console.log(this)
    try {
      this.NATSConn = NATS.connect(nats.hostname, { json: true, port: nats.port, reconnect: true })
      this.NATSConn.on('connect', () => {
        this.NATSConn.subscribe('vector_moleculer', (message, reply) => {
          console.log(message)
        })
      })
    } catch (err) {
      this.logger.error(err)
      throw new Errors.MoleculerError('Unable to connect to NATS')
    }
  }
}
