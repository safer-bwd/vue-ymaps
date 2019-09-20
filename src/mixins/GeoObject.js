import MapElement from '../mixins/MapElement';

// TODO add others events
const boundEvents = [
  'click'
];

// TODO add others props
const boundProps = [
  { name: 'coordinates', type: 'geometry' },
  { name: 'options', type: 'options' },
  { name: 'properties', type: 'properties' }
];

export default {
  mixins: [ MapElement ],

  props: {
    coordinates: {
      type: Array,
      required: true
    },

    radius: {
      type: Number,
      required: false
    },

    options: {
      type: Object,
      required: false,
      default: () => ({})
    },

    properties: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  async mounted () {
    const ymaps = await this.readyYMapsApi();
    const geoObj = this.createGeoObject(ymaps);
    this.setYMapsInstance(geoObj);
    this.bindEvents(boundEvents);
    this.bindProps(boundProps);
    await this.addGeoObjectToMap(geoObj);
    this.$emit('ready');
  },

  async destroyed () {
    const geoObj = this.getYMapsInstance();
    if (!geoObj) {
      return;
    }
    await this.removeGeoObjectFromMap(geoObj);
  },

  methods: {
    createGeoObject(ymaps) {
      const { GeoObject } = ymaps;

      const geoObj = new GeoObject({
        geometry: {
          type: this.type || 'Point',
          coordinates: this.coordinates,
          radius: this.radius
        },
        properties: { ... this.properties }
      }, {
        ...this.$attrs,
        ...this.options
      });

      return geoObj;
    },

    async addGeoObjectToMap(geoObj) {
      const map = await this.getYMapsMap();
      map.geoObjects.add(geoObj);
    },

    async removeGeoObjectFromMap (geoObj) {
      const map = await this.getYMapsMap();
      map.geoObjects.remove(geoObj);
    }
  }
};
