import plugin from '../';

export default {
  created () {
    this.$_ymaps_api = null;
  },

  async mounted () {
    try {
      this.$_ymaps_api = await plugin.ymapsReady();
    } catch (err) {
      // TODO add event or hook?
      return;
    }

    this.$options.$_ymaps_apiReady.call(this);
  },

  $_ymaps_apiReady () {
    // override in components
  },

  destroyed () {
    this.$_ymaps_api = null;
  },

  methods: {
    getYMapsApi () {
      return this.$_ymaps_api;
    }
  }
};
