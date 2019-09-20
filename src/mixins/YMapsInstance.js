import createPromise from '../utils/create-promise';

export default {
  created () {
    this.$_ymaps_instance = null;
    this.$_ymaps_instancePromise= createPromise();
  },

  methods: {
    setYMapsInstance (obj) {
      if (this.$_ymaps_instance ) {
        return;
      }
      this.$_ymaps_instance = obj;
      this.$_ymaps_instancePromise.resolve();
    },

    getYMapsInstance () {
      return this.$_ymaps_instance;
    },

    readyYMapsApiInstance () {
      return this.$_ymaps_instancePromise;
    }
  }
};
