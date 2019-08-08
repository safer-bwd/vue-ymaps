<template>
  <div>
    <h1>This is a placemark demo page</h1>
    <label>lat:</label>
    <input
      v-model.number="placemark.coordinates[0]"
      type="number"
      step="0.1"
    />
    &nbsp;
    <label>long:</label>
    <input
      v-model.number="placemark.coordinates[1]"
      type="number"
      step="0.1"
    />
    <br>
    <label>balloonContent:</label>
    <input v-model.number="placemark.properties.balloonContent"/>
    &nbsp;
    <label>iconCaption:</label>
    <input v-model.number="placemark.properties.iconCaption"/>
    <br>
    <label>draggable</label>
    <input type="checkbox"  v-model="placemark.options.draggable">
    &nbsp;
    <label>visible</label>
    <input type="checkbox"  v-model="placemark.options.visible">
    <br>
    <br>
    <y-map
      style="width: 600px; height: 400px"
      :center="[55.76, 37.64]"
      :zoom="10"
      :suppressMapOpenBlock="true"
    >
      <y-placemark
        :coordinates.sync="placemark.coordinates"
        :options="placemark.options"
        :properties="placemark.properties"
        @click="onPlacemarkClick"
      >
      </y-placemark>
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'
import YPlacemark from '@vue-ymaps/components/YPlacemark'

export default {
  name: 'placemark-page',

  components: { YMap, YPlacemark },

  data: () => ({
    placemark: {
      coordinates: [55.76, 37.64],
      properties: {
        balloonContent: 'balloon',
        iconCaption: 'caption'
      },
      options: {
        draggable: false,
        visible: true
      }
    }
  }),

  methods: {
    onPlacemarkClick () {
      alert('Click on placemark!')
    }
  }
}

</script>
