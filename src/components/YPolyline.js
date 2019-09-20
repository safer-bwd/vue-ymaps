import GeoObject from '../mixins/GeoObject';

export default {
  name: 'y-polyline',

  mixins: [ GeoObject ],

  // TODO validators
  props: {
    coordinates: {
      type: Array,
      required: true
    }

    // TODO other props
  },

  data: () => ({
    type: 'LineString'
  })
};
