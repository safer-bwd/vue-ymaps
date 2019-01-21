import apiLoader from './utils/apiLoader'

const plugin = {
  api: null,
  apiErr: null,
  subscribers: [],

  install (Vue, options = {}) {
    this._loadApi(options)
  },

  ready () {
    if (this._isApiLoaded()) {
      return Promise.resolve(this.api)
    } else if (this._isApiError()) {
      return Promise.reject(this.apiErr)
    }

    return new Promise((resolve, reject) => {
      this.subscribers.push({ resolve, reject })
    })
  },

  async _loadApi (options) {
    try {
      this.api = await apiLoader.load(options)
    } catch (err) {
      this.apiErr = err
      this.subscribers.forEach(s => s.reject(err))
      this.subscribers = []
      return
    }

    this.subscribers.forEach(s => s.resolve(this.api))
    this.subscribers = []
  },

  _isApiLoaded () {
    return !!this.api
  },

  _isApiError () {
    return !!this.apiErr
  }
}

export default plugin
