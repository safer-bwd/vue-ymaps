import GeoObject from '../mixins/GeoObject';

export default {
  name: 'y-placemark',

  mixins: [ GeoObject ],

  // TODO validators
  props: {
    coordinates: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    type: 'Point'
  })
};
