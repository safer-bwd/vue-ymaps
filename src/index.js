import apiLoader from './utils/apiLoader'

const plugin = {
  api: null,
  subscribers: [],

  install (Vue, options = {}) {
    this._loadApi(options)
  },

  ready () {
    if (this._isReady()) {
      return Promise.resolve(this.api)
    }

    return new Promise((resolve, reject) => {
      this.subscribers.push({ resolve, reject })
    })
  },

  async _loadApi (options) {
    try {
      this.api = await apiLoader.load(options)
    } catch (err) {
      this.subscribers.forEach(({ reject }) => reject(err))
      this.subscribers = []
      return
    }

    this.subscribers.forEach(({ resolve }) => resolve(this.api))
    this.subscribers = []
  },

  _isReady () {
    return !!this.api
  }
}

export default plugin
