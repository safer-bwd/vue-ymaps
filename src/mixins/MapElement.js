import YMapsApi from '../mixins/YMapsApi';
import YMapsObject from '../mixins/YMapsObject';
import EventsBinder from '../mixins/EventsBinder';
import PropsBinder from '../mixins/PropsBinder';

export default {
  mixins: [
    YMapsApi,
    YMapsObject,
    EventsBinder,
    PropsBinder
  ],

  created () {
    this.$_ymaps_mapComp = this.findMapComponent();
    if (!this.$_ymaps_mapComp) {
      throw new Error(`${this.constructor.name} must be used within a YMap component.`);
    }
  },

  render() {
  },

  methods: {
    findMapComponent () {
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
      const mapComp = this.$_ymaps_mapComp;
      await mapComp.readyYMapsObj();
      return mapComp.getYMapsObj();
    }
  }
};
