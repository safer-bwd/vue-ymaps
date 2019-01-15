import ApiLoader from './utils/ApiLoader'

const VueYMaps = {
  installed: false,

  install (Vue, options = {}) {
    if (this.installed) {
      return
    }

    this.loader = new ApiLoader(options)
    this.loader.load()

    this.installed = true
  },

  loader: null,

  load () {
    if (!this.installed) {
      throw new Error('Vue-ymaps plugin not installed')
    }
    this.loader.load()
  },

  ready () {
    if (!this.installed) {
      throw new Error('Vue-ymaps plugin not installed')
    }
    return this.loader.ready()
  }
}

export default VueYMaps
