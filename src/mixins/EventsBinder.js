import keys from 'lodash.keys';
import listenTo from '../utils/ymaps-listen-to';

export default {
  created () {
    this.$_ymaps_boundEvents = [];
  },

  beforeDestroy () {
    this.unbindEvents();
  },

  methods: {
    bindEvents (names) {
      const usedEventNames = keys(this.$listeners);
      if (names.length === 0 || usedEventNames.length === 0) {
        return;
      }

      names
        .filter(n => usedEventNames.includes(n))
        .forEach(n => this.bindEvent(n));
    },

    bindEvent (name) {
      if (this.isEventBound(name)) {
        return;
      }

      const obj = this.getYMapsObj();
      const unbind = listenTo(obj, name, (event, ...args) => {
        this.$emit(name, event, ...args);
      });
      this.$_ymaps_boundEvents.push({ name, unbind });
    },

    unbindEvents () {
      if (this.$_ymaps_boundEvents.length === 0) {
        return;
      }

      this.$_ymaps_boundEvents.forEach(e => e.unbind());
      this.$_ymaps_boundEvents = [];
    },

    isEventBound (name) {
      return !!this.$_ymaps_boundEvents.find(e => e.name === name);
    }
  }
};
