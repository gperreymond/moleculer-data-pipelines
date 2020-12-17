const WebMixin = require('moleculer-web')

module.exports = {
  mixins: [WebMixin],
  settings: {
    port: 4000,
    // Global CORS settings for all routes
    cors: {
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: '*',
      // Configures the Access-Control-Allow-Methods CORS header.
      methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      // Configures the Access-Control-Allow-Headers CORS header.
      allowedHeaders: [],
      // Configures the Access-Control-Expose-Headers CORS header.
      exposedHeaders: [],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: false,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600
    },
    routes: [{
      mappingPolicy: 'restrict',
      aliases: {
        'POST api/v1/sources/webhook': 'SourcesDomain.ReceiveDataFromWebhookCommand'
      }
    }]
  }
}
