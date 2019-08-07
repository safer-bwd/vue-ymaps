import GeoObject from '../mixins/GeoObject';

// TODO add others events
const boundEvents = [
  'click'
];

// TODO add others props
const boundProps = [
  { name: 'coordinates', type: 'geometry' },
  { name: 'options', type: 'options' }
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

    // TODO other props
  },

  async mounted () {
    await this.createPlacemark();
    this.bindEvents(boundEvents);
    this.bindProps(boundProps);
    await this.addToMap();
    this.$emit('ready');
  },

  methods: {
    async createPlacemark () {
      const { Placemark } = await this.getYMapsApi();
      const placemark = new Placemark(this.coordinates);
      this.setYMapsObj(placemark);
    }
  }
};
