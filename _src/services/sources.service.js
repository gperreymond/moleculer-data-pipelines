module.exports = {
  name: 'SourcesDomain',
  actions: {
    ReceiveDataFromWebhookCommand: {
      handler: require('../domains/sources/commands/ReceiveDataFromWebhookCommand')
    }
  },
  events: {
  },
  methods: {
  }
}
