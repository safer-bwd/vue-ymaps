import createPromise from '../utils/create-promise';

export default {
  created () {
    this.$_ymaps_obj = null;
    this.$_ymaps_promise = createPromise();
  },

  methods: {
    setYMapsObj (obj) {
      if (this.$_ymaps_obj ) {
        return;
      }
      this.$_ymaps_obj = obj;
      this.$_ymaps_promise.resolve();
    },

    getYMapsObj () {
      return this.$_ymaps_obj;
    },

    readyYMapsObj () {
      return this.$_ymaps_promise;
    }
  }
};
