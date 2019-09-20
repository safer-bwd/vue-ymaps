import GeoObject from '../mixins/GeoObject';

export default {
  name: 'y-circle',

  mixins: [ GeoObject ],

  // TODO validators
  props: {
    coordinates: {
      type: Array,
      required: true
    },

    radius: {
      type: Number,
      required: true
    },
  },

  data: () => ({
    type: 'Circle'
  })
};
