<template>
  <div>
    <div ref="map" :style="mapStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import plugin from '../';
import YMapsApi from '../mixins/YMapsApi';
import YMapsObject from '../mixins/YMapsObject';
import EventsBinder from '../mixins/EventsBinder';
import PropsBinder from '../mixins/PropsBinder';

// TODO add others events
const boundEvents = [
  'click'
];

// TODO add others props
const boundProps = [
  { name: 'center', type: 'boundary' },
  { name: 'zoom', type: 'boundary' },
  { name: 'type', type: 'state' },
  { name: 'options', type: 'options' }
];

// TODO bind ymaps object methods?
export default {
  name: 'y-map',

  mixins: [
    YMapsApi,
    YMapsObject,
    EventsBinder,
    PropsBinder
  ],

  // TODO validators
  props: {
    center: {
      type: Array,
      required: false,
      default: () => [0, 0]
    },

    zoom: {
      type: Number,
      required: false,
      default: 1
    },

    type: {
      type: String,
      required: false,
      default: 'yandex#map'
    },

    controls: {
      type: Array,
      required: false,
      default: () => ['default']
    },

    behaviors: {
      type: Array,
      required: false,
      default: () => ['default']
    },

    options: {
      type: Object,
      required: false,
      default: () => ({})
    },

    // TODO other props
  },

  computed: {
    mapStyle () {
      return {
        position: 'relative',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };
    }
  },

  beforeCreate () {
    if (this.$isServer) {
      return;
    }
    plugin.loadYMaps();
  },

  async mounted () {
    const ymaps = await this.readyYMaps();
    const map = this.createMap(ymaps);
    this.setYMapsObj(map);
    this.bindEvents(boundEvents);
    this.bindProps(boundProps);
    this.$emit('ready');
  },

  destroyed () {
    const map = this.getYMapsObj();
    if (map) {
      map.destroy();
    }
  },

  methods: {
    createMap (ymaps) {
      const { Map } = ymaps;

      const map = new Map(this.$refs.map, {
        center: this.center,
        zoom: this.zoom,
        type: this.type,
        controls: this.controls,
        behaviors: this.behaviors
      }, {
        ...this.$attrs,
        ...this.options
      });

      return map;
    }
  }
};
</script>
