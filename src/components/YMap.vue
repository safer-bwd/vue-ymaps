<template>
  <div>
    <div ref="map" :style="mapStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import YMapsApi from '../mixins/YMapsApi'
import YMapsObject from '../mixins/YMapsObject'
import EventsBinder from '../mixins/EventsBinder'
import PropsBinder from '../mixins/PropsBinder'

// TODO add others events
const boundEvents = [
  'click'
]

// TODO add others props
const boundProps = [
  { name: 'center', type: 'bounds' },
  { name: 'zoom', type: 'bounds' },
  { name: 'type', type: 'state'}
]

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
    }
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
      }
    }
  },

  $_ymaps_apiReady () {
    if (this.isYMapsObj()) {
      return
    }

    const map = this.createMap()
    this.setYMapsObj(map)

    this.bindEvents(boundEvents)
    this.bindProps(boundProps)

    // TODO add event?
  },

  beforeDestroy () {
    if (!this.isYMapsObj()) {
      return
    }

    const obj = this.getYMapsObj()
    obj.destroy()
  },

  methods: {
    createMap () {
      const api = this.getYMapsApi()

      return new api.Map(this.$refs.map, {
        center: this.center,
        zoom: this.zoom,
        type: this.type,
        controls: this.controls,
        behaviors: this.behaviors
      })
    }
  }
}
</script>

<style scoped>
</style>
