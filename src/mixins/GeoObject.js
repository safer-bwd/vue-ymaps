import MapElement from '../mixins/MapElement';

export default {
  mixins: [ MapElement ],

  destroyed () {
    this.removeFromMap();
  },

  methods: {
    async addToMap () {
      const obj = this.getYMapsInstance();
      if (!obj) {
        return;
      }
      const map = await this.getYMapsMap();
      map.geoObjects.add(obj);
    },

    async removeFromMap () {
      const obj = this.getYMapsInstance();
      if (!obj) {
        return;
      }
      const map = await this.getYMapsMap();
      map.geoObjects.remove(obj);
    }
  }
};
