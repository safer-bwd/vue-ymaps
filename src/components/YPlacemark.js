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

// TODO bind ymaps object methods?
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
    },

    // TODO other props
  },

  async mounted () {
    const ymaps = await this.readyYMaps();
    const placemark = this.createPlacemark(ymaps);
    this.setYMapsObj(placemark);
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
