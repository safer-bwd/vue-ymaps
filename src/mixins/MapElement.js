import YMapsApi from '../mixins/YMapsApi';
import YMapsInstance from '../mixins/YMapsInstance';
import EventsBinder from '../mixins/EventsBinder';
import PropsBinder from '../mixins/PropsBinder';

export default {
  mixins: [
    YMapsApi,
    YMapsInstance,
    EventsBinder,
    PropsBinder
  ],

  created () {
    this.$_ymaps_map_vue = this.findVueMap();
    if (!this.$_ymaps_map_vue) {
      throw new Error(`${this.constructor.name} must be used within a YMap component.`);
    }
  },

  render() {
  },

  methods: {
    findVueMap() {
      const findIter = (comp) => {
        if (!comp) {
          return null;
        }
        if (comp.$options.name === 'y-map') {
          return comp;
        }
        return findIter(comp.$parent);
    };

      return findIter(this.$parent);
    },

    async getYMapsMap () {
      const mapVue = this.$_ymaps_map_vue;
      await mapVue.readyYMapsApiInstance();
      const map = mapVue.getYMapsInstance();
      return map;
    }
  }
};
