import _keys from 'lodash/fp/keys'

export default {
  created () {
    this.$_ymaps_listeners = []
  },

  beforeDestroy () {
    if (!this.isYMapsObj()) {
      return
    }

    this.unbindEvents()
  },

  methods: {
    bindEvents (names) {
      if (!names.length || !this.isYMapsObj()) {
        return
      }

      names
        .filter(n => _keys(this.$listeners).includes(n))
        .forEach(n => { this.bindEvent(n) })
    },

    bindEvent (name) {
      if (!this.isYMapsObj()) {
        return
      }

      this.addYMapsEventListener(name, (targetEvent, ...args) => {
        this.$emit(name, targetEvent, ...args)
      })
    },

    unbindEvents() {
      this.removeYMapsEventListeners()
    },

    addYMapsEventListener (evenName, callback) {
      const obj = this.getYMapsObj()

      // https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/IEventManager-docpage
      const eventManager = obj.events.add(evenName, callback)
      const remove = () => { eventManager.remove(evenName, callback) }

      this.$_ymaps_listeners.push({ evenName, remove })
    },

    removeYMapsEventListeners () {
      if (!this.$_ymaps_listeners.length) {
        return
      }

      this.$_ymaps_listeners.forEach(l => l.remove())
      this.$_ymaps_listeners = []
    }
  }
}
