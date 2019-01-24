export default {
  created () {
    this.$_ymaps_obj = null
  },

  destroyed () {
    this.$_ymaps_obj = null
  },

  methods: {
    setYMapsObj (obj) {
      this.$_ymaps_obj = obj
    },

    getYMapsObj () {
      return this.$_ymaps_obj
    },

    isYMapsObj () {
      return !!this.$_ymaps_obj
    }
  }
}
