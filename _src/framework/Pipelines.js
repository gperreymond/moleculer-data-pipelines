class Pipelines {
  constructor (config) {
    this._config = config
  }

  async getAllServices () {
    console.log(this._config)
    return []
  }
}

module.exports = Pipelines
