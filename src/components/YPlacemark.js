import GeoObject from '../mixins/GeoObject';

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
  name: 'y-placemark',

  mixins: [ GeoObject ],

  // TODO validators
  props: {
    coordinates: {
      type: Array,
      required: true
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
    const placemark = this.createPlacemark(ymaps);
    this.setYMapsInstance(placemark);
    this.bindEvents(boundEvents);
    this.bindProps(boundProps);
    await this.addToMap();
    this.$emit('ready');
  },

  methods: {
    createPlacemark (ymaps) {
      const { Placemark } = ymaps;

      const placemark = new Placemark(this.coordinates, {
        ...this.properties
      }, {
        ...this.$attrs,
        ...this.options
      });

      return placemark;
    }
  }
};
