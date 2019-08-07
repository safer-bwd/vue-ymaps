<template>
  <div>
    <h1>This is a map demo page</h1>
    <label>type:</label>
    <select v-model="map.type">
      <option value="yandex#map">map</option>
      <option value="yandex#satellite">satellite</option>
      <option value="yandex#hybrid">hybrid</option>
    </select>
    &nbsp;
    <label>zoom:</label>
    <input
      v-model.number="map.zoom"
      type="number"
      min="1"
      max="19"
    />
    <br>
    <span>
      lat: {{ map.center[0] }}, long: {{ map.center[1] }}
    </span>
    <br>
    <label>nativeFullscreen</label>
    <input type="checkbox"  v-model="map.options.nativeFullscreen">
    <br>
    <label>suppressMapOpenBlock</label>
    <input type="checkbox"  v-model="map.options.suppressMapOpenBlock">
    <br>
    <br>
    <y-map
      style="width: 600px; height: 400px"
      :center.sync="map.center"
      :zoom.sync="map.zoom"
      :type.sync="map.type"
      :options="map.options"
      @click="onMapClick"
    >
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'

export default {
  name: 'map-demo-page',

  components: { YMap },

  data: () => ({
    map: {
      type: 'yandex#map',
      zoom: 10,
      center: [55.76, 37.64],
      options: {
        nativeFullscreen: false,
        suppressMapOpenBlock: false
      }
    }
  }),

  methods: {
    onMapClick () {
      alert('Click on map!')
    }
  }
}
</script>
