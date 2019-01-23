import _keys from 'lodash/fp/keys'

export default {
  created () {
    this.$_ymaps_boundEvents = []
  },

  beforeDestroy () {
    this.unbindEvents()
  },

  methods: {
    bindEvents (names) {
      if (!this.isYMapsObj()) {
        return
      }

      const usedEventNames = _keys(this.$listeners)
      if (names.length === 0 || usedEventNames.length === 0) {
        return
      }

      names
        .filter(n => usedEventNames.includes(n))
        .forEach(n => { this.bindEvent(n) })
    },

    bindEvent (name) {
      if (!this.isYMapsObj()) {
        return
      }

      if (this.isEventBound(name)) {
        return
      }

      const unbind = this.addYMapsEventListener(name, (targetEvent, ...args) => {
        this.$emit(name, targetEvent, ...args)
      })
      this.$_ymaps_boundEvents.push({ name, unbind })
    },

    unbindEvents () {
      if (this.$_ymaps_boundEvents.length === 0) {
        return
      }

      this.$_ymaps_boundEvents.forEach(e => e.unbind())
      this.$_ymaps_boundEvents = []
    },

    addYMapsEventListener (eventName, callback) {
      const obj = this.getYMapsObj()
      // https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/IEventManager-docpage
      const eventManager = obj.events.add(eventName, callback)
      return () => { eventManager.remove(eventName, callback) }
    },

    isEventBound (name) {
      const found = this.$_ymaps_boundEvents
        .find(e => e.name === name)
      return found !== undefined
    }
  }
}
