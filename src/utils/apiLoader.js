export default {
  api: null,
  loadPromise: null,

  async load (options) {
    if (typeof window === 'undefined') {
      throw new Error('Unable to load Yandex.Maps on server-side')
    }

    if (this._isLoaded()) {
      return this.api
    }

    if (!this.loadPromise) {
      this.loadPromise = this._loadScript(options)
    }

    try {
      this.api = await this.loadPromise
    } catch (err) {
      throw err
    }

    this.loadPromise = null
    return this.api
  },

  _loadScript (options) {
    options = options || {}

    const {
      apikey = '',
      version = '2.1',
      lang = 'ru_Ru',
      mode = 'release',
      ns = 'ymaps',
      modules = 'package.full',
      url = 'https://api-maps.yandex.ru'
    } = options

    let src = `${url}/${version}/?load=${modules}&lang=${lang}&mode=${mode}&ns=${ns}`
    if (apikey) {
      src += `&apikey=${apikey}`
    }

    const scriptElem = document.createElement('script')
    scriptElem.setAttribute('src', src)
    scriptElem.setAttribute('async', '')
    scriptElem.setAttribute('defer', '')
    document.body.appendChild(scriptElem)

    return new Promise((resolve, reject) => {
      // TODO unbind event
      scriptElem.addEventListener('error', () => {
        reject(new Error('Failed to load Yandex.Maps'))
      })

      // TODO unbind event
      scriptElem.addEventListener('load', () => {
        if (typeof window[ns] === 'undefined') {
          reject(new Error('Failed to load Yandex.Maps'))
          return
        }
        window[ns].ready(() => resolve(window[ns]), err => reject(err))
      })
    })
  },

  _isLoaded () {
    return !!this.api
  }
}
