class ApiLoader {
  constructor (options) {
    this.options = options || {}
    this.instance = null
    this.subscribers = []
  }

  async load () {
    if (this.instance) {
      return
    }

    if (typeof window === 'undefined') {
      throw new Error('Unable to load Yandex.Maps on server-side')
    }

    try {
      this.instance = await this._loadScript()
    } catch (err) {
      this._notify(err)
      return
    }

    this._notify(null)
  }

  ready () {
    if (this.instance) {
      return Promise.resolve(this.instance)
    }

    return new Promise((resolve, reject) => {
      this.subscribers.push({ resolve, reject })
    })
  }

  _loadScript () {
    const {
      apikey = '',
      version = '2.1',
      lang = 'ru_Ru',
      mode = 'release',
      modules = 'package.full',
      url = 'https://api-maps.yandex.ru'
      // ns = 'ymaps'
    } = this.options

    let src = `${url}/${version}/?load=${modules}&lang=${lang}&mode=${mode}`
    if (apikey) {
      src += `&apikey=${apikey}`
    }

    const scriptElem = document.createElement('script')
    scriptElem.setAttribute('src', src)
    scriptElem.setAttribute('async', '')
    scriptElem.setAttribute('defer', '')
    document.body.appendChild(scriptElem)

    return new Promise((resolve, reject) => {
      scriptElem.addEventListener('error', () => {
        reject(new Error('Failed to load Yandex.Maps'))
      })

      scriptElem.addEventListener('load', () => {
        if (typeof window.ymaps === 'undefined') {
          reject(new Error('Failed to load Yandex.Maps'))
          return
        }
        window.ymaps.ready(() => resolve(window.ymaps), err => reject(err))
      })
    })
  }

  _notify (err) {
    this.subscribers.forEach(({ resolve, reject }) => {
      if (err) {
        reject(err)
        return
      }
      resolve(this.instance)
    })
  }
}

export default ApiLoader
